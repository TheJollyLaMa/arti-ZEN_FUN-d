import { useState, useEffect } from 'react';
import './styles/global.css';
import { useGameState, clearSavedGame, useReducedMotion } from './hooks/useGameState';
import { PROJECTS } from './data/projects';
import { FUNDS } from './data/funds';
import { RULES } from './data/rules';
import { BOARD_SPACES } from './data/encounters';
import { calculateAllFits } from './game/fitEngine';
import { simulateCuration } from './components/Encounters/CurationSimulator';
import { scorePitch } from './game/scoring';
import ProjectPicker from './components/ProjectPicker/ProjectPicker';
import Board from './components/Board/Board';
import Spinner from './components/Spinner/Spinner';
import Encounters from './components/Encounters/Encounters';
import FundCard from './components/FundCard/FundCard';
import PitchBuilder from './components/PitchBuilder/PitchBuilder';
import CurationSimulatorView from './components/Encounters/CurationSimulator';
import MatchSimulator from './components/MatchSimulator/MatchSimulator';
import GardenPlan from './components/GardenPlan/GardenPlan';
import GardenGuide from './components/GardenGuide/GardenGuide';
import type { FundDriveResult, Pitch } from './game/types';
import { PITCH_PHRASES } from './data/pitchPhrases';
import './App.css';

export default function App() {
  const [state, dispatch] = useGameState();
  const [listView, setListView] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);

  useEffect(() => {
    setHasSavedGame(state.phase !== 'welcome' && state.savedAt !== null);
  }, []);

  const reducedMotion = useReducedMotion(state.reducedMotion);

  useEffect(() => {
    if (state.isMoving && state.lastRoll !== null && state.lastRoll > 0) {
      const delay = reducedMotion ? 0 : 250;
      const t = setTimeout(() => { dispatch({ type: 'ADVANCE_TOKEN' }); }, delay);
      return () => clearTimeout(t);
    }
  }, [state.isMoving, state.lastRoll, reducedMotion, dispatch]);

  useEffect(() => {
    if (!state.isMoving && state.currentEncounter === null && state.currentSpace > 0 && state.currentSpace <= RULES.totalSpaces) {
      const space = BOARD_SPACES.find((s) => s.id === state.currentSpace);
      if (space && !state.completedSpaces.includes(space.id)) {
        dispatch({ type: 'LAND_ON_SPACE', space });
      }
    }
  }, [state.isMoving, state.currentEncounter, state.currentSpace, state.completedSpaces, dispatch]);

  function handleSelectProject(projectId: string) {
    dispatch({ type: 'SELECT_PROJECT', projectId });
    const project = PROJECTS.find((p) => p.id === projectId)!;
    const fits = calculateAllFits(project, FUNDS);
    fits.forEach((fit) => dispatch({ type: 'ADD_FIT_RESULT', result: fit }));
  }

  function handleSelectFund(fundId: string) {
    const fit = state.fitResults.find((r) => r.fundId === fundId);
    dispatch({ type: 'SELECT_FUND', fundId });
    if (fit?.level === 'strong') dispatch({ type: 'ADD_POINTS', points: 20 });
  }

  function handlePitchSubmit(pitch: Pitch) {
    const scored = scorePitch(pitch.phraseIds, PITCH_PHRASES);
    const fp: Pitch = { ...pitch, score: scored.score, feedback: scored.feedback };
    dispatch({ type: 'SUBMIT_PITCH', pitch: fp });
    if (scored.score >= 75) dispatch({ type: 'ADD_POINTS', points: 25 });
  }

  function handleGoToCuration() {
    const toSimulate = state.pitches.length > 0 ? state.pitches : state.selectedFundIds.map((fid) => ({ fundId: fid, phraseIds: [], score: 0, feedback: '' } as Pitch));
    toSimulate.forEach((pitch) => {
      const fund = FUNDS.find((f) => f.id === pitch.fundId);
      if (!fund) return;
      dispatch({ type: 'ADD_CURATION_RESULT', result: simulateCuration(fund, pitch, state.seedValue) });
    });
    dispatch({ type: 'GO_TO_CURATION' });
  }

  function handleFundDriveComplete(results: FundDriveResult[]) {
    results.forEach((r) => dispatch({ type: 'ADD_FUND_DRIVE_RESULT', result: r }));
  }

  function handleCopyPlan() {
    const project = PROJECTS.find((p) => p.id === state.selectedProjectId);
    const lines = [
      '=== Your Garden Plan ===',
      `Project: ${project?.name ?? 'Unknown'}`,
      `Growth Points: ${state.growthPoints}`,
      '',
      'Curation Outcomes:',
      ...state.curationResults.map((r) => {
        const f = FUNDS.find((fund) => fund.id === r.fundId);
        return `- ${f?.name}: ${r.outcome}`;
      }),
      '',
      '⚠️ All amounts and outcomes are simulated examples.',
      'Verify current information at artizen.fund before taking action.',
    ];
    navigator.clipboard.writeText(lines.join('\n')).catch(() => alert(lines.join('\n')));
  }

  function handlePlayAgain() {
    clearSavedGame();
    dispatch({ type: 'RESET_GAME' });
    setHasSavedGame(false);
  }

  const canProceedFromFunds = state.selectedFundIds.length > 0 || state.skippedFundIds.length >= 3;
  const curatedFundIds = state.curationResults.filter((r) => r.outcome === 'curated').map((r) => r.fundId);
  const curatedFunds = FUNDS.filter((f) => curatedFundIds.includes(f.id));

  return (
    <div className={reducedMotion ? 'reduced-motion' : ''}>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header className="app-header">
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h1 className="app-title">🌱 The Match Garden</h1>
              <p className="app-subtitle">Discover where your project can genuinely grow.</p>
            </div>
            <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
              {state.phase !== 'welcome' && state.phase !== 'choose-project' && (
                <span className="growth-points" aria-label={`${state.growthPoints} Growth Points`}>🌿 {state.growthPoints} GP</span>
              )}
              <button className="btn btn-secondary" onClick={() => setShowHelp(!showHelp)} aria-expanded={showHelp} aria-controls="help-panel">
                {showHelp ? '✕ Help' : '? Help'}
              </button>
              <button className="btn btn-secondary" onClick={() => dispatch({ type: 'TOGGLE_REDUCED_MOTION' })} aria-pressed={state.reducedMotion}>
                {state.reducedMotion ? '⚡ Less' : '🎬 Animate'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {showHelp && (
        <div id="help-panel" role="region" aria-label="Help" style={{ background: 'var(--zone-cultivate)', borderBottom: '1px solid var(--color-light-border)', padding: '1rem 0' }}>
          <div className="container stack">
            <h2>How to Play</h2>
            <ol><li>Choose a sample project — your seed.</li><li>Roll and move along 30 spaces.</li><li>Encounter decisions, soil tests, trellises, and roots.</li><li>Evaluate sample Funds.</li><li>Build practice pitches.</li><li>See simulated curation outcomes.</li><li>Run a Fund Drive simulation.</li><li>Receive your Garden Plan.</li></ol>
            <div className="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>{RULES.disclaimer}</span></div>
          </div>
        </div>
      )}

      <main id="main" className="container main-content" role="main">

        {state.phase === 'welcome' && (
          <section className="welcome-screen animate-fade-in" aria-labelledby="welcome-h">
            <div className="welcome-hero">
              <div className="welcome-art" aria-hidden="true">🌱🌿🌻</div>
              <h2 id="welcome-h">Welcome to The Match Garden</h2>
              <blockquote className="welcome-quote">
                <p>Your project is a seed.</p>
                <p>Artizen Funds are garden beds cultivated around different missions. Your goal is not to plant your seed everywhere. Your goal is to discover where it can genuinely grow.</p>
                <p>Find the right soil, make your case, get curated, and help your community unlock the sunlight waiting for your project.</p>
              </blockquote>
              <div className="welcome-actions row">
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'START_GAME' })} autoFocus>🌱 Plant My Seed</button>
                <button className="btn btn-secondary" onClick={() => setShowHelp(true)}>🌿 How Funds Work</button>
              </div>
              {hasSavedGame && (
                <p className="welcome-saved">You have a saved game. <button className="btn btn-secondary" onClick={() => dispatch({ type: 'START_GAME' })} style={{display:'inline-flex',marginLeft:'0.5rem'}}>▶️ Resume</button><button className="btn btn-secondary" onClick={handlePlayAgain} style={{display:'inline-flex',marginLeft:'0.5rem'}}>🔄 Start Fresh</button></p>
              )}
            </div>
            <div className="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>{RULES.disclaimer}</span></div>
          </section>
        )}

        {state.phase === 'choose-project' && (
          <ProjectPicker projects={PROJECTS} onSelect={handleSelectProject} />
        )}

        {state.phase === 'playing' && (
          <div className="stack">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div>
                <h2>Space {state.currentSpace} / {state.totalSpaces}</h2>
                <p>Seed: <strong>{PROJECTS.find((p) => p.id === state.selectedProjectId)?.name}</strong></p>
              </div>
              <button className="btn btn-secondary" onClick={() => setListView(!listView)} aria-pressed={listView}>{listView ? '🗺️ Board' : '📋 List'}</button>
            </div>
            <Board state={state} listView={listView} />
            {state.currentEncounter && !state.encounterResolved && (
              <Encounters space={state.currentEncounter} onResolve={(id, ref) => dispatch({ type: 'RESOLVE_ENCOUNTER', optionId: id, reflection: ref })} />
            )}
            {state.encounterResolved && !state.isMoving && state.currentSpace < RULES.totalSpaces && (
              <div className="spinner-section"><Spinner onRoll={(v) => dispatch({ type: 'ROLL_DIE', value: v })} disabled={!state.encounterResolved || state.isMoving} reducedMotion={reducedMotion} /></div>
            )}
            {state.currentSpace >= 25 && state.encounterResolved && !state.isMoving && (
              <div className="card" style={{ textAlign: 'center' }}><p>🌾 Approaching the Harvest Table!</p><button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_SELECT_FUNDS' })} style={{ marginTop: '0.6rem' }}>Evaluate Funds →</button></div>
            )}
          </div>
        )}

        {state.phase === 'select-funds' && (
          <section aria-labelledby="sf-h" className="stack">
            <h2 id="sf-h">Evaluate the Garden Beds 🌻</h2>
            <p>Select Funds that genuinely fit <strong>{PROJECTS.find((p) => p.id === state.selectedProjectId)?.name}</strong>. Skip poor fits — good judgment earns points.</p>
            <div className="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>Fictional examples only. {RULES.verifyDisclaimer}</span></div>
            <div className="funds-grid">
              {FUNDS.map((fund) => (
                <FundCard key={fund.id} fund={fund} fitResult={state.fitResults.find((r) => r.fundId === fund.id)} selected={state.selectedFundIds.includes(fund.id)} skipped={state.skippedFundIds.includes(fund.id)} onSelect={handleSelectFund} onSkip={(id) => dispatch({ type: 'SKIP_FUND', fundId: id })} />
              ))}
            </div>
            {canProceedFromFunds ? (
              <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_BUILD_PITCH' })}>Build Applications →</button>
            ) : (
              <p className="card" style={{ padding: '0.8rem 1rem' }}>Select at least one Fund or skip at least three to continue.</p>
            )}
          </section>
        )}

        {state.phase === 'build-pitch' && (
          <section aria-labelledby="bp-h" className="stack">
            <h2 id="bp-h">Assemble Your Pitches ✍️</h2>
            {state.selectedFundIds.length === 0 && <GardenGuide message="You skipped all Funds. Let's see the next steps anyway." />}
            {state.selectedFundIds.map((fid) => {
              const fund = FUNDS.find((f) => f.id === fid)!;
              const ep = state.pitches.find((p) => p.fundId === fid);
              return (
                <div key={fid} className="card">
                  {ep ? (<div><h3>{fund.name} — Submitted ✅</h3><p>Score: <strong>{ep.score}/100</strong></p><p style={{fontSize:'0.9rem',marginTop:'0.3rem'}}>{ep.feedback}</p></div>)
                  : (<PitchBuilder fund={fund} onSubmit={handlePitchSubmit} />)}
                </div>
              );
            })}
            {(state.pitches.length > 0 || state.selectedFundIds.length === 0) ? (
              <button className="btn btn-primary" onClick={handleGoToCuration}>Submit Applications →</button>
            ) : (
              <p style={{ fontSize: '0.88rem', color: 'var(--color-mid)' }}>Complete at least one pitch to continue.</p>
            )}
          </section>
        )}

        {state.phase === 'curation' && (
          <section aria-labelledby="cur-h" className="stack">
            <h2 id="cur-h">Simulated Curation Results 🌸</h2>
            <div className="simulated-notice" role="note"><span aria-hidden="true">⚠️</span><span>Simulated for learning only — not real Director decisions.</span></div>
            {state.curationResults.map((r) => {
              const fund = FUNDS.find((f) => f.id === r.fundId)!;
              return <CurationSimulatorView key={r.fundId} fund={fund} result={r} />;
            })}
            <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_FUND_DRIVE' })}>Enter the Fund Drive →</button>
          </section>
        )}

        {state.phase === 'fund-drive' && (
          <section aria-labelledby="fd-h" className="stack">
            <h2 id="fd-h">Fund Drive Simulation 🌻</h2>
            {curatedFunds.length > 0 ? (
              <MatchSimulator curatedFunds={curatedFunds} onComplete={handleFundDriveComplete} />
            ) : (
              <div className="card"><GardenGuide message="None of your practice applications were curated this time — valuable information! In real practice, you'd refine your pitch and consider a better-fitting Fund." /></div>
            )}
            <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_GARDEN_PLAN' })}>View My Garden Plan 🌾</button>
          </section>
        )}

        {(state.phase === 'garden-plan' || state.phase === 'complete') && (
          <GardenPlan state={state} onCopyPlan={handleCopyPlan} onPrintPlan={() => window.print()} onPlayAgain={handlePlayAgain} />
        )}

      </main>

      <footer className="app-footer"><div className="container"><p>The Match Garden — an independent educational game. Not affiliated with Artizen. <a href={RULES.officialLinks.funds} target="_blank" rel="noopener noreferrer">Visit artizen.fund ↗</a></p><p className="app-footer__disclaimer">{RULES.disclaimer}</p></div></footer>
    </div>
  );
}
