import {
  BOARD_SPACES,
  FUNDS,
  PROJECTS,
  PITCH_PHRASES,
  RULES,
  SCORE,
  calculateAllFits,
  calculateMatchUnlocked,
  createInitialState,
  getBoardPlacement,
  gameReducer,
  rollD6,
  scorePitch,
  simulateCuration,
  createSeededRng,
} from './game.js';

const STORAGE_KEY = 'match-garden-state-v1';
const root = document.getElementById('root');
const rng = createSeededRng(Date.now());

let state = loadState();
let showHelp = false;
let listView = false;
let selectedStrategy = null;
let pitchDrafts = {};
let movementTimer = null;

const SPACE_ICONS = {
  path: '🌀',
  decision: '⚖️',
  'soil-test': '🔎',
  trellis: '🪜',
  root: '🌱',
  'garden-guide': '🧭',
  'wild-bloom': '🌼',
  reflection: '✍️',
};

const BOARD_MODE_HINTS = {
  compact: 'Path view',
  expanded: 'Guide view',
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    return { ...createInitialState(parsed.seedValue ?? Date.now()), ...parsed };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, savedAt: Date.now() }),
    );
  } catch {
    // ignore persistence errors
  }
}

function clearSavedGame() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function formatMoney(value) {
  return `$${value.toLocaleString()}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getProject() {
  return PROJECTS.find((project) => project.id === state.selectedProjectId) ?? null;
}

function getCuratedFunds() {
  const curatedFundIds = state.curationResults
    .filter((result) => result.outcome === 'curated')
    .map((result) => result.fundId);
  return FUNDS.filter((fund) => curatedFundIds.includes(fund.id));
}

function canProceedFromFunds() {
  return state.selectedFundIds.length > 0 || state.skippedFundIds.length >= 3;
}

function currentPitchDraft(fundId) {
  if (!pitchDrafts[fundId]) {
    const draft = {};
    for (const category of ['what', 'who', 'evidence', 'impact', 'engagement']) {
      draft[category] = PITCH_PHRASES.find(
        (phrase) => phrase.category === category && phrase.isSpecific,
      )?.id ?? '';
    }
    pitchDrafts[fundId] = draft;
  }
  return pitchDrafts[fundId];
}

function dispatch(action) {
  state = gameReducer(state, action);
  state = { ...state, savedAt: Date.now() };
  saveState();
  render();
  scheduleEffects();
}

function scheduleEffects() {
  clearTimeout(movementTimer);
  movementTimer = null;

  if (state.isMoving && state.lastRoll !== null && state.lastRoll > 0) {
    const delay = state.reducedMotion ? 0 : 250;
    movementTimer = setTimeout(() => dispatch({ type: 'ADVANCE_TOKEN' }), delay);
  }
}

function renderBadge(level) {
  return `<span class="badge badge-${level}">${level}</span>`;
}

function renderBoard() {
  const modeClass = listView ? 'board-grid--expanded' : 'board-grid--compact';
  const spaces = BOARD_SPACES.map((space) => {
   const isCurrent = space.id === state.currentSpace;
   const isVisited = state.completedSpaces.includes(space.id);
   const placement = getBoardPlacement(space.id);
   const icon = SPACE_ICONS[space.type] ?? '🌿';
   return `<li class="board-space board-space--${space.type} ${isCurrent ? 'is-current' : ''} ${isVisited ? 'is-visited' : ''}" style="--board-column:${placement.column}; --board-row:${placement.row}; --board-drift:${placement.drift}rem; --board-tilt:${placement.tilt};">
     <span class="board-space__icon" aria-hidden="true">${icon}</span>
     <strong class="board-space__title">${escapeHtml(space.title)}</strong>
     <span class="board-space__meta">${escapeHtml(space.zone)} · ${escapeHtml(space.type)}</span>
     ${listView ? `<span class="board-space__content">${escapeHtml(space.content)}</span>` : `<span class="sr-only">${escapeHtml(space.content)}</span>`}
   </li>`;
  }).join('');

  return `<ol class="board-grid ${modeClass}" aria-label="Board path">${spaces}</ol>`;
}

function renderAccountBridge() {
  return `<section class="card account-bridge ${state.artizenAccountLinked ? 'is-linked' : ''}">
   <div class="row account-bridge__row">
     <div>
       <h2>Artizen account</h2>
       <p>${state.artizenAccountLinked
         ? 'Linked. Use your own project lane when you apply.'
         : 'Connect to swap in your own project lane for future applications.'}</p>
     </div>
     <button class="btn btn-secondary" data-action="toggle-artizen-account">
       ${state.artizenAccountLinked ? 'Disconnect' : 'Connect'}
     </button>
   </div>
   <p class="account-bridge__hint">This demo keeps the connection symbolic, but the path is ready for your real projects.</p>
  </section>`;
}

function renderEncounter() {
  const space = state.currentEncounter;
  if (!space || state.encounterResolved) return '';

  if (space.type === 'reflection') {
    const key = space.reflectionKey ?? space.title;
    return `<section class="card encounter-card">
      <h3>${escapeHtml(space.title)}</h3>
      <p>${escapeHtml(space.content)}</p>
      <textarea class="reflection-input" name="reflection" data-reflection-key="${escapeHtml(key)}" rows="4" placeholder="Write your reflection...">${escapeHtml(
        state.reflections[key] ?? '',
      )}</textarea>
      <button class="btn btn-primary" data-action="submit-reflection">Save Reflection</button>
    </section>`;
  }

  const options = (space.options ?? [])
    .map(
      (option) => `<button class="btn btn-secondary" data-action="resolve-encounter" data-option-id="${escapeHtml(option.id)}">${escapeHtml(option.text)}</button>`,
    )
    .join('');

  const guide = space.guideMessage
    ? `<div class="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>${escapeHtml(space.guideMessage)}</span></div>`
    : '';

  return `<section class="card encounter-card">
    <h3>${escapeHtml(space.title)}</h3>
    <p>${escapeHtml(space.content)}</p>
    ${guide}
    ${options ? `<div class="button-stack">${options}</div>` : '<button class="btn btn-primary" data-action="resolve-encounter">Continue</button>'}
  </section>`;
}

function renderProjectPicker() {
  return `<section class="stack">
    <h2>Choose Your Project Seed</h2>
    <p>Select a seed or connect your Artizen account to keep the experience project-centric.</p>
    ${renderAccountBridge()}
    <div class="project-grid">
      ${PROJECTS.map(
        (project) => `<article class="card project-card">
          <div class="project-card__icon" aria-hidden="true">🌿</div>
          <h3>${escapeHtml(project.name)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <p class="project-traits">${project.traits.map((trait) => `<span class="tag">${escapeHtml(trait)}</span>`).join('')}</p>
          <button class="btn btn-primary" data-action="select-project" data-project-id="${escapeHtml(project.id)}">Plant this Seed</button>
        </article>`,
      ).join('')}
    </div>
  </section>`;
}

function renderFunds() {
  return `<section class="stack">
    <div class="section-heading">
      <div>
        <h2>Evaluate the garden beds 🌻</h2>
        <p>Pick the Funds that really fit <strong>${escapeHtml(getProject()?.name ?? 'your project')}</strong>.</p>
      </div>
      <button class="btn btn-secondary" data-action="go-build-pitch">Build Applications →</button>
    </div>
    <div class="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>${escapeHtml(RULES.verifyDisclaimer)}</span></div>
    <div class="funds-grid">
      ${FUNDS.map((fund) => {
        const fit = state.fitResults.find((result) => result.fundId === fund.id);
        const selected = state.selectedFundIds.includes(fund.id);
        const skipped = state.skippedFundIds.includes(fund.id);
        const fitIcon = fit?.level === 'strong' ? '✨' : fit?.level === 'possible' ? '🌿' : fit?.level === 'weak' ? '🪴' : '🌱';
        return `<article class="card fund-card ${selected ? 'is-selected' : ''} ${skipped ? 'is-skipped' : ''}">
          <div class="row fund-card__header">
            <span class="fund-card__icon" aria-hidden="true">${fitIcon}</span>
            <h3>${escapeHtml(fund.name)}</h3>
            ${fit ? renderBadge(fit.level) : ''}
          </div>
          <p>${escapeHtml(fund.mission)}</p>
          <ul class="fund-list">${fund.eligibilityRequirements.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          <p><strong>Match:</strong> ${escapeHtml(fund.sampleAvailableMatch)}</p>
          ${fit ? `<p class="fit-explanation">${escapeHtml(fit.explanation)}</p>` : ''}
          <div class="row">
            <button class="btn btn-primary" data-action="select-fund" data-fund-id="${escapeHtml(fund.id)}" ${selected || skipped ? 'disabled' : ''}>Select</button>
            <button class="btn btn-secondary" data-action="skip-fund" data-fund-id="${escapeHtml(fund.id)}" ${selected || skipped ? 'disabled' : ''}>Skip</button>
          </div>
        </article>`;
      }).join('')}
    </div>
    ${canProceedFromFunds()
      ? ''
      : '<p class="card">Select at least one Fund or skip at least three to continue.</p>'}
  </section>`;
}

function renderPitchBuilder() {
  return `<section class="stack">
    <div class="section-heading">
      <div>
        <h2>Assemble Your Pitches ✍️</h2>
        <p>Pick one phrase from each category for every Fund you selected.</p>
      </div>
      <button class="btn btn-secondary" data-action="go-curation">Submit Applications →</button>
    </div>
    ${state.selectedFundIds.length === 0
      ? `<div class="card"><p>You skipped all Funds. You can still continue to the curation step and see what happens.</p></div>`
      : ''}
    ${state.selectedFundIds.map((fundId) => {
      const fund = FUNDS.find((item) => item.id === fundId);
      const submitted = state.pitches.find((pitch) => pitch.fundId === fundId);
      if (!fund) return '';
      if (submitted) {
        return `<article class="card">
          <h3>${escapeHtml(fund.name)} — Submitted ✅</h3>
          <p>Score: <strong>${submitted.score}/100</strong></p>
          <p>${escapeHtml(submitted.feedback)}</p>
        </article>`;
      }
      const draft = currentPitchDraft(fundId);
      const grouped = ['what', 'who', 'evidence', 'impact', 'engagement']
        .map((category) => {
          const options = PITCH_PHRASES.filter((phrase) => phrase.category === category)
            .map(
              (phrase) => `<option value="${escapeHtml(phrase.id)}"${draft[category] === phrase.id ? ' selected' : ''}>${escapeHtml(phrase.text)}</option>`,
            )
            .join('');
          return `<label class="pitch-field">
            <span>${escapeHtml(category.toUpperCase())}</span>
            <select name="${category}">${options}</select>
          </label>`;
        })
        .join('');
      return `<article class="card">
        <h3>${escapeHtml(fund.name)}</h3>
        <form class="pitch-form" data-fund-id="${escapeHtml(fundId)}">
          ${grouped}
          <button class="btn btn-primary" type="submit">Submit Pitch</button>
        </form>
      </article>`;
    }).join('')}
    ${state.pitches.length > 0 || state.selectedFundIds.length === 0
      ? ''
      : '<p>Complete at least one pitch to continue.</p>'}
  </section>`;
}

function renderCuration() {
  return `<section class="stack">
    <h2>Simulated Curation Results 🌸</h2>
    <div class="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>Simulated for learning only — not real Director decisions.</span></div>
    ${state.curationResults.map((result) => {
      const fund = FUNDS.find((item) => item.id === result.fundId);
      if (!fund) return '';
      return `<article class="card curation-result curation-result--${escapeHtml(result.outcome)}">
        <div class="row"><strong>${escapeHtml(fund.name)}</strong> ${renderBadge(result.outcome)}</div>
        <p>${escapeHtml(result.explanation)}</p>
      </article>`;
    }).join('')}
    <button class="btn btn-primary" data-action="go-fund-drive">Enter the Fund Drive →</button>
  </section>`;
}

function renderFundDrive() {
  const curatedFunds = getCuratedFunds();
  const strategyButtons = [
    { id: 'large', label: 'Ask one supporter for a large purchase', description: 'One supporter buys a $50 Artifact.' },
    { id: 'small', label: 'Invite several supporters to make small purchases', description: 'Five supporters each buy a $10 Artifact ($50 total).' },
    { id: 'wait', label: 'Wait and communicate nothing', description: 'No outreach. No purchases.' },
  ];
  const strategyFeedback = {
    large: 'A single large supporter can unlock significant match — but reaching them requires clear, direct communication.',
    small: 'Multiple small purchases can add up and may unlock more total match through community engagement.',
    wait: 'Without outreach, supporters don\'t know the Fund Drive is happening. Match often goes unlocked when creators stay silent.',
  };

  if (curatedFunds.length === 0) {
    return `<section class="stack">
      <h2>Fund Drive Simulation 🌻</h2>
      <div class="card"><p>No Funds were curated this round. That still teaches you something valuable: fit matters.</p></div>
      <button class="btn btn-primary" data-action="go-garden-plan">View My Garden Plan 🌾</button>
    </section>`;
  }

  return `<section class="stack">
    <h2>Fund Drive Simulation 🌻</h2>
    <div class="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>All amounts below are teaching examples. Match Multiple: <strong>${RULES.defaultMatchMultiple}x</strong> (simulated). ${escapeHtml(RULES.verifyDisclaimer)}</span></div>
    <p>Choose a supporter engagement strategy:</p>
    <div class="strategy-group" role="radiogroup" aria-label="Supporter strategy">
      ${strategyButtons.map((strategy) => `<button class="strategy ${selectedStrategy === strategy.id ? 'is-selected' : ''}" data-action="set-strategy" data-strategy="${strategy.id}">
        <strong>${escapeHtml(strategy.label)}</strong>
        <span>${escapeHtml(strategy.description)}</span>
      </button>`).join('')}
    </div>
    <button class="btn btn-primary" data-action="run-fund-drive" ${selectedStrategy ? '' : 'disabled'}>Run Simulation 🌱</button>
    ${state.fundDriveResults.length > 0 ? `<div class="fund-drive-results">
      <div class="card">${escapeHtml(strategyFeedback[selectedStrategy] ?? 'Simulation complete.')}</div>
      ${state.fundDriveResults.map((result) => {
        const fund = FUNDS.find((item) => item.id === result.fundId);
        return `<article class="card">
          <h3>${escapeHtml(fund?.name ?? 'Fund')}</h3>
          <dl class="stats">
            <div><dt>Match Multiple</dt><dd>${result.matchMultiple}x</dd></div>
            <div><dt>Artifact Sales</dt><dd>${formatMoney(result.artifactSales)} (simulated)</dd></div>
            <div><dt>Match Available</dt><dd>${formatMoney(result.matchAvailable)} (simulated)</dd></div>
            <div><dt>Match Unlocked</dt><dd>${formatMoney(result.matchUnlocked)} (simulated)</dd></div>
            <div><dt>Match Remaining</dt><dd>${formatMoney(result.matchRemaining)} (simulated)</dd></div>
            <div><dt>Total Raised</dt><dd>${formatMoney(result.totalRaised)} (simulated)</dd></div>
          </dl>
          ${result.matchRemaining === 0 ? '<p role="status">🌻 All available match unlocked! +200 Growth Points!</p>' : ''}
        </article>`;
      }).join('')}
    </div>` : ''}
    <button class="btn btn-primary" data-action="go-garden-plan">View My Garden Plan 🌾</button>
  </section>`;
}

function renderGardenPlan() {
  const project = getProject();
  return `<section class="stack garden-plan">
    <h2>Your Garden Plan 🌾</h2>
    <div class="card">
      <p><strong>Project:</strong> ${escapeHtml(project?.name ?? 'Unknown')}</p>
      <p><strong>Growth Points:</strong> ${state.growthPoints}</p>
      <p><strong>Saved:</strong> ${new Date(state.savedAt ?? Date.now()).toLocaleString()}</p>
    </div>
    <div class="card">
      <h3>Curation Outcomes</h3>
      <ul>
        ${state.curationResults.map((result) => {
          const fund = FUNDS.find((item) => item.id === result.fundId);
          return `<li>${escapeHtml(fund?.name ?? result.fundId)}: ${escapeHtml(result.outcome)}</li>`;
        }).join('')}
      </ul>
    </div>
    <div class="card">
      <h3>Reflections</h3>
      <ul>
        ${Object.entries(state.reflections).map(([key, value]) => `<li><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</li>`).join('') || '<li>No reflections yet.</li>'}
      </ul>
    </div>
    <div class="row">
      <button class="btn btn-secondary" data-action="copy-plan">Copy Plan</button>
      <button class="btn btn-secondary" data-action="print-plan">Print Plan</button>
      <button class="btn btn-primary" data-action="play-again">Play Again</button>
    </div>
  </section>`;
}

function renderPlaying() {
  const currentProject = getProject();
  return `<section class="stack">
    <div class="section-heading">
      <div>
        <h2>Space ${state.currentSpace} / ${state.totalSpaces}</h2>
        <p>Seed: <strong>${escapeHtml(currentProject?.name ?? '')}</strong></p>
      </div>
      <button class="btn btn-secondary" data-action="toggle-list-view">${listView ? '🗺️ Path' : '📋 Guide'}</button>
    </div>
    <div class="board-shell ${listView ? 'is-expanded' : 'is-compact'}">
      <div class="board-shell__legend">
        <span>${BOARD_MODE_HINTS[listView ? 'expanded' : 'compact']}</span>
        <span>${state.reducedMotion ? '⚡ Reduced motion' : '🎬 Motion on'}</span>
      </div>
      ${renderBoard()}
    </div>
    ${renderEncounter()}
    ${!state.isMoving && !state.currentEncounter && state.currentSpace < RULES.totalSpaces
      ? `<div class="card center"><p>Roll the die to continue through the garden.</p><button class="btn btn-primary" data-action="roll-die">Roll the Die</button></div>`
      : ''}
    ${state.currentSpace >= 25 && !state.isMoving && !state.currentEncounter
      ? `<div class="card center"><p>🌾 Approaching the Harvest Table!</p><button class="btn btn-primary" data-action="go-select-funds">Evaluate Funds →</button></div>`
      : ''}
  </section>`;
}

function renderWelcome() {
  return `<section class="welcome-screen animate-fade-in" aria-labelledby="welcome-h">
    <div class="welcome-hero">
      <div class="welcome-art" aria-hidden="true">🌱🌿🌻</div>
      <h2 id="welcome-h">Welcome to The Match Garden</h2>
      <blockquote class="welcome-quote">
        <p>Your project is a seed.</p>
        <p>Funds are beds with different soil. Find the right fit, then help your community unlock the light waiting for your project.</p>
      </blockquote>
      <div class="welcome-actions row">
        <button class="btn btn-primary" data-action="start-game">🌱 Plant My Seed</button>
        <button class="btn btn-secondary" data-action="toggle-help">🌿 How Funds Work</button>
      </div>
    </div>
    <div class="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>${escapeHtml(RULES.disclaimer)}</span></div>
  </section>`;
}

function renderHelp() {
  return `<div id="help-panel" class="help-panel" role="region" aria-label="Help">
    <div class="container stack">
      <h2>How to Play</h2>
      <ol>
        <li>Choose a sample project — your seed.</li>
        <li>Roll and move along 30 living spaces.</li>
        <li>Encounter decisions, soil tests, trellises, and roots.</li>
        <li>Evaluate sample Funds.</li>
        <li>Build practice pitches.</li>
        <li>See simulated curation outcomes.</li>
        <li>Run a Fund Drive simulation.</li>
        <li>Receive your Garden Plan.</li>
      </ol>
      <div class="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>${escapeHtml(RULES.disclaimer)}</span></div>
    </div>
  </div>`;
}

function render() {
  const reduced = state.reducedMotion ? 'reduced-motion' : '';
  const header = `<header class="app-header"><div class="container"><div class="row app-header__row">
    <div><h1 class="app-title">🌱 The Match Garden</h1><p class="app-subtitle">Discover where your project can genuinely grow.</p></div>
    <div class="row">
      ${state.phase !== 'welcome' && state.phase !== 'choose-project' ? `<span class="growth-points" aria-label="${state.growthPoints} Growth Points">🌿 ${state.growthPoints} GP</span>` : ''}
      <button class="btn btn-secondary" data-action="toggle-help">${showHelp ? '✕ Help' : '? Help'}</button>
      <button class="btn btn-secondary" data-action="toggle-motion">${state.reducedMotion ? '⚡ Less' : '🎬 Animate'}</button>
    </div>
  </div></div></header>`;

  const main = `<main id="main" class="container main-content" role="main">
    ${state.phase === 'welcome' ? renderWelcome() : ''}
    ${state.phase === 'choose-project' ? renderProjectPicker() : ''}
    ${state.phase === 'playing' ? renderPlaying() : ''}
    ${state.phase === 'select-funds' ? renderFunds() : ''}
    ${state.phase === 'build-pitch' ? renderPitchBuilder() : ''}
    ${state.phase === 'curation' ? renderCuration() : ''}
    ${state.phase === 'fund-drive' ? renderFundDrive() : ''}
    ${state.phase === 'garden-plan' || state.phase === 'complete' ? renderGardenPlan() : ''}
  </main>`;

  root.className = reduced;
  root.innerHTML = `${header}${showHelp ? renderHelp() : ''}${main}<footer class="app-footer"><div class="container"><p>The Match Garden — an independent educational game. Not affiliated with Artizen. <a href="${RULES.officialLinks.funds}" target="_blank" rel="noopener noreferrer">Visit artizen.fund ↗</a></p><p class="app-footer__disclaimer">${escapeHtml(RULES.disclaimer)}</p></div></footer>`;
}

function onClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action } = button.dataset;

  if (action === 'toggle-help') {
    showHelp = !showHelp;
    render();
    return;
  }

  if (action === 'toggle-motion') {
    dispatch({ type: 'TOGGLE_REDUCED_MOTION' });
    return;
  }

  if (action === 'toggle-artizen-account') {
    dispatch({ type: 'TOGGLE_ARTIZEN_ACCOUNT' });
    return;
  }

  if (action === 'start-game') {
    dispatch({ type: 'START_GAME' });
    return;
  }

  if (action === 'resume-game') {
    render();
    return;
  }

  if (action === 'play-again') {
    clearSavedGame();
    selectedStrategy = null;
    pitchDrafts = {};
    listView = false;
    showHelp = false;
    state = createInitialState(Date.now());
    saveState();
    render();
    return;
  }

  if (action === 'select-project') {
    const projectId = button.dataset.projectId;
    if (!projectId) return;
    dispatch({ type: 'SELECT_PROJECT', projectId });
    const project = PROJECTS.find((item) => item.id === projectId);
    if (project) {
      const fits = calculateAllFits(project, FUNDS);
      fits.forEach((fit) => dispatch({ type: 'ADD_FIT_RESULT', result: fit }));
    }
    return;
  }

  if (action === 'toggle-list-view') {
    listView = !listView;
    render();
    return;
  }

  if (action === 'roll-die') {
    dispatch({ type: 'ROLL_DIE', value: rollD6(rng) });
    return;
  }

  if (action === 'resolve-encounter') {
    const optionId = button.dataset.optionId;
    dispatch({ type: 'RESOLVE_ENCOUNTER', optionId });
    return;
  }

  if (action === 'submit-reflection') {
    const textarea = button.closest('.encounter-card')?.querySelector('.reflection-input');
    const reflection = textarea?.value?.trim() ?? '';
    dispatch({ type: 'RESOLVE_ENCOUNTER', reflection });
    return;
  }

  if (action === 'select-fund') {
    const fundId = button.dataset.fundId;
    if (!fundId) return;
    const fit = state.fitResults.find((result) => result.fundId === fundId);
    dispatch({ type: 'SELECT_FUND', fundId });
    if (fit?.level === 'strong') dispatch({ type: 'ADD_POINTS', points: SCORE.IDENTIFY_STRONG_FIT });
    return;
  }

  if (action === 'skip-fund') {
    const fundId = button.dataset.fundId;
    if (!fundId) return;
    dispatch({ type: 'SKIP_FUND', fundId });
    return;
  }

  if (action === 'go-build-pitch') {
    if (canProceedFromFunds()) dispatch({ type: 'GO_TO_BUILD_PITCH' });
    return;
  }

  if (action === 'go-select-funds') {
    dispatch({ type: 'GO_TO_SELECT_FUNDS' });
    return;
  }

  if (action === 'go-curation') {
    const pitches = state.pitches.length > 0
      ? state.pitches
      : state.selectedFundIds.map((fundId) => ({ fundId, phraseIds: [], score: 0, feedback: '' }));
    pitches.forEach((pitch) => {
      const fund = FUNDS.find((item) => item.id === pitch.fundId);
      if (!fund) return;
      dispatch({ type: 'ADD_CURATION_RESULT', result: simulateCuration(fund, pitch, state.seedValue) });
    });
    dispatch({ type: 'GO_TO_CURATION' });
    return;
  }

  if (action === 'go-fund-drive') {
    dispatch({ type: 'GO_TO_FUND_DRIVE' });
    return;
  }

  if (action === 'set-strategy') {
    selectedStrategy = button.dataset.strategy ?? null;
    render();
    return;
  }

  if (action === 'run-fund-drive') {
    if (!selectedStrategy) return;
    const curatedFunds = getCuratedFunds();
    const results = curatedFunds.map((fund) => {
      const matchAvailable = RULES.simulatedMatchAvailable;
      if (selectedStrategy === 'small') {
        let totalMatch = 0;
        let remaining = matchAvailable;
        let totalSales = 0;
        for (let i = 0; i < 5; i++) {
          const result = calculateMatchUnlocked(10, RULES.defaultMatchMultiple, remaining);
          totalMatch += result.matchUnlocked;
          remaining = result.matchRemaining;
          totalSales += 10;
        }
        return {
          fundId: fund.id,
          artifactSales: totalSales,
          matchAvailable,
          matchUnlocked: totalMatch,
          matchRemaining: matchAvailable - totalMatch,
          matchMultiple: RULES.defaultMatchMultiple,
          totalRaised: totalSales + totalMatch,
        };
      }

      const saleAmount =
        selectedStrategy === 'large' ? 50 : 0;
      const matchResult = calculateMatchUnlocked(
        saleAmount,
        RULES.defaultMatchMultiple,
        matchAvailable,
      );
      return {
        fundId: fund.id,
        artifactSales: saleAmount,
        matchAvailable,
        matchUnlocked: matchResult.matchUnlocked,
        matchRemaining: matchResult.matchRemaining,
        matchMultiple: RULES.defaultMatchMultiple,
        totalRaised: matchResult.totalRaised,
      };
    });

    results.forEach((result) => dispatch({ type: 'ADD_FUND_DRIVE_RESULT', result }));
    return;
  }

  if (action === 'go-garden-plan') {
    dispatch({ type: 'GO_TO_GARDEN_PLAN' });
    return;
  }

  if (action === 'copy-plan') {
    const lines = [
      '=== Your Garden Plan ===',
      `Project: ${getProject()?.name ?? 'Unknown'}`,
      `Growth Points: ${state.growthPoints}`,
      '',
      'Curation Outcomes:',
      ...state.curationResults.map((result) => {
        const fund = FUNDS.find((item) => item.id === result.fundId);
        return `- ${fund?.name ?? result.fundId}: ${result.outcome}`;
      }),
      '',
      '⚠️ All amounts and outcomes are simulated examples.',
      'Verify current information at artizen.fund before taking action.',
    ];
    navigator.clipboard.writeText(lines.join('\n')).catch(() => alert(lines.join('\n')));
    return;
  }

  if (action === 'print-plan') {
    window.print();
  }
}

function onSubmit(event) {
  const form = event.target.closest('form.pitch-form');
  if (!form) return;
  event.preventDefault();

  const fundId = form.dataset.fundId;
  if (!fundId) return;

  const formData = new FormData(form);
  const phraseIds = ['what', 'who', 'evidence', 'impact', 'engagement']
    .map((category) => String(formData.get(category) ?? ''))
    .filter(Boolean);
  const scored = scorePitch(phraseIds, PITCH_PHRASES);
  const pitch = { fundId, phraseIds, score: scored.score, feedback: scored.feedback };
  dispatch({ type: 'SUBMIT_PITCH', pitch });
  if (scored.score >= 75) dispatch({ type: 'ADD_POINTS', points: SCORE.CREATE_TAILORED_PITCH });
}

function onChange(event) {
  const select = event.target.closest('select');
  if (!select) return;
  const form = select.closest('form.pitch-form');
  if (!form) return;
  const fundId = form.dataset.fundId;
  if (!fundId) return;
  const draft = currentPitchDraft(fundId);
  draft[select.name] = select.value;
  pitchDrafts[fundId] = draft;
}

root.addEventListener('click', onClick);
root.addEventListener('submit', onSubmit);
root.addEventListener('change', onChange);

render();
scheduleEffects();
