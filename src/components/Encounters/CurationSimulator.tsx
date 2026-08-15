import type { CurationResult, Pitch, Fund } from '../../game/types';
import { createSeededRng } from '../../game/seededRandom';
import './CurationSimulator.css';

const OUTCOME_LABELS = {
  curated: { emoji: '🌸', label: 'Curated!', className: 'curated' },
  'needs-clarification': { emoji: '🤔', label: 'Needs Clarification', className: 'clarification' },
  'eligible-not-selected': { emoji: '🌿', label: 'Eligible, but not selected', className: 'eligible' },
  'not-eligible': { emoji: '🪴', label: 'Not currently eligible', className: 'ineligible' },
};

const OUTCOME_EXPLANATIONS = {
  curated:
    'Curated! Your project demonstrated a clear connection to this Fund\'s mission. The Director has added your project to this garden bed.',
  'needs-clarification':
    'Needs clarification. The Director can see potential alignment but needs a concrete example of how your project serves the stated community.',
  'eligible-not-selected':
    'Eligible, but not selected. Your application was credible, but curation is still a human decision. This is not a verdict on the quality of your work.',
  'not-eligible':
    'Not currently eligible. Your project may be healthy, but this garden bed requires different soil. Consider whether a different Fund is a stronger fit.',
};

/**
 * Determine a simulated curation outcome.
 * Higher pitch scores → better outcomes. A small seeded random element adds variety.
 */
export function simulateCuration(
  fund: Fund,
  pitch: Pitch,
  seed: number
): CurationResult {
  const rng = createSeededRng(seed + fund.id.length);
  const random = rng();
  const score = pitch.score;

  let outcome: CurationResult['outcome'];
  if (score >= 75 && random < 0.7) {
    outcome = 'curated';
  } else if (score >= 75 && random < 0.9) {
    outcome = 'needs-clarification';
  } else if (score >= 50 && random < 0.6) {
    outcome = 'needs-clarification';
  } else if (score >= 50 && random < 0.85) {
    outcome = 'eligible-not-selected';
  } else if (score >= 30) {
    outcome = 'eligible-not-selected';
  } else {
    outcome = 'not-eligible';
  }

  return {
    fundId: fund.id,
    outcome,
    explanation: OUTCOME_EXPLANATIONS[outcome],
  };
}

interface Props {
  fund: Fund;
  result: CurationResult;
}

export default function CurationSimulator({ fund, result }: Props) {
  const meta = OUTCOME_LABELS[result.outcome];

  return (
    <article
      className={`curation-result curation-result--${meta.className} animate-fade-in`}
      aria-label={`Curation result for ${fund.name}`}
    >
      <div className="curation-result__header">
        <span className="curation-result__emoji" aria-hidden="true">{meta.emoji}</span>
        <h3 className="curation-result__label">{meta.label}</h3>
      </div>
      <p className="curation-result__fund">{fund.name}</p>
      <p className="curation-result__explanation">{result.explanation}</p>
      <div className="simulated-notice" role="note">
        <span aria-hidden="true">⚠️</span>
        <span>This is a simulated result for learning purposes only. It does not represent a real Director's decision.</span>
      </div>
    </article>
  );
}
