import type { GameState } from '../../game/types';
import { PROJECTS } from '../../data/projects';
import { FUNDS } from '../../data/funds';
import { RULES } from '../../data/rules';
import './GardenPlan.css';

interface Props {
  state: GameState;
  onCopyPlan: () => void;
  onPrintPlan: () => void;
  onPlayAgain: () => void;
}

export default function GardenPlan({
  state,
  onCopyPlan,
  onPrintPlan,
  onPlayAgain,
}: Props) {
  const project = PROJECTS.find((p) => p.id === state.selectedProjectId);
  const selectedFunds = FUNDS.filter((f) => state.selectedFundIds.includes(f.id));
  const skippedFunds = FUNDS.filter((f) => state.skippedFundIds.includes(f.id));
  const strongFits = state.fitResults.filter((r) => r.level === 'strong');
  const curatedFunds = state.curationResults.filter((r) => r.outcome === 'curated');

  const checklist = [
    'Confirm which Artizen Funds are currently open.',
    'Read each Fund\'s current eligibility language.',
    'Identify concrete evidence that your project fits.',
    'Tailor a separate application for each appropriate Fund.',
    'Submit only where there is genuine alignment.',
    'Check current Fund Drive rules and Match Multiple.',
    'Return when a Director responds.',
    'Treat a pass as information about fit, not a judgment on the art.',
  ];

  return (
    <section className="garden-plan" aria-labelledby="gp-heading" id="garden-plan-content">
      <div className="garden-plan__header">
        <h2 id="gp-heading">🌾 Your Garden Plan</h2>
        <p className="garden-plan__subtitle">
          A personalized summary of your learning session.
        </p>
      </div>

      <div className="simulated-notice" role="note">
        <span aria-hidden="true">⚠️</span>
        <span>{RULES.disclaimer}</span>
      </div>

      {/* Score */}
      <div className="gp-card gp-card--score">
        <h3>Growth Points</h3>
        <p className="gp-score">{state.growthPoints} 🌱</p>
        <p className="gp-score-label">out of {RULES.maxPoints} possible points</p>
      </div>

      {/* Project */}
      {project && (
        <div className="gp-card">
          <h3>Your Seed</h3>
          <p className="gp-project-name">{project.name}</p>
          <p className="gp-project-desc">{project.description}</p>
          <ul className="gp-traits" aria-label="Project traits">
            {project.traits.map((t) => (
              <li key={t} className="trait-tag">{t.replace(/-/g, ' ')}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Strong fits */}
      {strongFits.length > 0 && (
        <div className="gp-card">
          <h3>Strong Fund Matches 🌱</h3>
          <ul className="gp-list">
            {strongFits.map((fit) => {
              const fund = FUNDS.find((f) => f.id === fit.fundId);
              return (
                <li key={fit.fundId}>
                  <strong>{fund?.name}</strong> — {fit.explanation}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Applied funds */}
      {selectedFunds.length > 0 && (
        <div className="gp-card">
          <h3>Practice Applications Submitted</h3>
          <ul className="gp-list">
            {selectedFunds.map((fund) => {
              const pitch = state.pitches.find((p) => p.fundId === fund.id);
              return (
                <li key={fund.id}>
                  <strong>{fund.name}</strong>
                  {pitch && <span className="gp-pitch-score"> — Pitch score: {pitch.score}/100</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Correctly skipped */}
      {skippedFunds.length > 0 && (
        <div className="gp-card">
          <h3>Funds Correctly Skipped ✅</h3>
          <p className="gp-note">
            You identified these as poor fits and skipped them — a valuable skill that earns Growth Points.
          </p>
          <ul className="gp-list">
            {skippedFunds.map((fund) => (
              <li key={fund.id}>{fund.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Curation results */}
      {state.curationResults.length > 0 && (
        <div className="gp-card">
          <h3>Simulated Curation Outcomes</h3>
          <ul className="gp-list">
            {state.curationResults.map((res) => {
              const fund = FUNDS.find((f) => f.id === res.fundId);
              const labels: Record<string, string> = {
                curated: '🌸 Curated',
                'needs-clarification': '🤔 Needs Clarification',
                'eligible-not-selected': '🌿 Eligible, not selected',
                'not-eligible': '🪴 Not currently eligible',
              };
              return (
                <li key={res.fundId}>
                  <strong>{fund?.name}</strong>: {labels[res.outcome]}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Fund Drive results */}
      {state.fundDriveResults.length > 0 && (
        <div className="gp-card">
          <h3>Fund Drive Results (Simulated)</h3>
          <ul className="gp-list">
            {state.fundDriveResults.map((res) => {
              const fund = FUNDS.find((f) => f.id === res.fundId);
              return (
                <li key={res.fundId}>
                  <strong>{fund?.name}</strong>: ${res.artifactSales} in sales → ${res.matchUnlocked} match unlocked → ${res.totalRaised} total{' '}
                  <em>(all simulated)</em>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Curated funds */}
      {curatedFunds.length > 0 && (
        <div className="gp-card gp-card--bloom">
          <h3>🌸 Projects That Bloomed</h3>
          <ul className="gp-list">
            {curatedFunds.map((res) => {
              const fund = FUNDS.find((f) => f.id === res.fundId);
              return <li key={res.fundId}>{fund?.name}</li>;
            })}
          </ul>
        </div>
      )}

      {/* Reflections */}
      {Object.keys(state.reflections).length > 0 && (
        <div className="gp-card">
          <h3>Your Reflections 💭</h3>
          <dl className="gp-reflections">
            {Object.entries(state.reflections).map(([key, value]) => (
              <div key={key} className="gp-reflection">
                <dt className="gp-reflection__key">{key.replace(/-/g, ' ')}</dt>
                <dd className="gp-reflection__value">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Next steps checklist */}
      <div className="gp-card">
        <h3>Recommended Next Steps</h3>
        <p className="gp-note">{RULES.verifyDisclaimer}</p>
        <ul className="gp-checklist">
          {checklist.map((item) => (
            <li key={item} className="gp-checklist__item">
              <span aria-hidden="true">☐</span> {item}
            </li>
          ))}
        </ul>
        <div className="gp-links">
          <a href={RULES.officialLinks.funds} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Browse Artizen Funds ↗
          </a>
          <a href={RULES.officialLinks.howItWorks} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            How Artizen Works ↗
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="gp-actions row">
        <button className="btn btn-primary" onClick={onCopyPlan} aria-label="Copy Garden Plan to clipboard">
          📋 Copy Plan
        </button>
        <button className="btn btn-secondary" onClick={onPrintPlan} aria-label="Print Garden Plan">
          🖨️ Print Plan
        </button>
        <button className="btn btn-accent" onClick={onPlayAgain} aria-label="Play again">
          🌱 Play Again
        </button>
      </div>
    </section>
  );
}
