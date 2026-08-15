import type { Fund, FitResult } from '../../game/types';
import './FundCard.css';

interface Props {
  fund: Fund;
  fitResult?: FitResult;
  selected?: boolean;
  skipped?: boolean;
  onSelect?: (fundId: string) => void;
  onSkip?: (fundId: string) => void;
  showActions?: boolean;
}

const FIT_LABEL: Record<string, string> = {
  strong: '🌱 Strong Fit',
  possible: '🌿 Possible Fit',
  weak: '🍂 Weak Fit',
  ineligible: '🚫 Ineligible',
};

const STATUS_LABEL: Record<string, string> = {
  open: '🟢 Open',
  closed: '🔴 Closed',
  rolling: '🔄 Rolling',
};

export default function FundCard({
  fund,
  fitResult,
  selected,
  skipped,
  onSelect,
  onSkip,
  showActions = true,
}: Props) {
  return (
    <article
      className={[
        'fund-card',
        selected ? 'fund-card--selected' : '',
        skipped ? 'fund-card--skipped' : '',
        fitResult ? `fund-card--fit-${fitResult.level}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`Fund: ${fund.name}`}
    >
      <header className="fund-card__header">
        <h3 className="fund-card__name">{fund.name}</h3>
        <span className="fund-card__status">{STATUS_LABEL[fund.applicationStatus]}</span>
      </header>

      <p className="fund-card__mission">{fund.mission}</p>

      {fitResult && (
        <div className={`fund-card__fit badge badge-${fitResult.level}`} aria-label={`Fit level: ${fitResult.level}`}>
          {FIT_LABEL[fitResult.level]}
        </div>
      )}

      {fitResult?.explanation && (
        <p className="fund-card__explanation">{fitResult.explanation}</p>
      )}

      {fitResult?.matchingTraits && fitResult.matchingTraits.length > 0 && (
        <div className="fund-card__traits">
          <span className="fund-card__traits-label">Matching traits:</span>
          <ul className="trait-list" aria-label="Matching traits">
            {fitResult.matchingTraits.map((t) => (
              <li key={t} className="trait-tag trait-tag--match">{t.replace(/-/g, ' ')}</li>
            ))}
          </ul>
        </div>
      )}

      <details className="fund-card__details">
        <summary>Eligibility requirements</summary>
        <ul className="fund-card__req-list">
          {fund.eligibilityRequirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
        </ul>
      </details>

      <div className="simulated-notice" role="note">
        <span aria-hidden="true">⚠️</span>
        <span>
          Match available: <strong>{fund.sampleAvailableMatch}</strong>.{' '}
          {fund.note}
        </span>
      </div>

      {showActions && !selected && !skipped && (
        <div className="fund-card__actions row">
          <button
            className="btn btn-primary"
            onClick={() => onSelect?.(fund.id)}
            aria-label={`Apply to ${fund.name}`}
            disabled={fitResult?.level === 'ineligible'}
          >
            Apply Here 🌱
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onSkip?.(fund.id)}
            aria-label={`Skip ${fund.name}`}
          >
            Skip (not a fit)
          </button>
        </div>
      )}

      {selected && (
        <p className="fund-card__chosen" role="status">
          ✅ You chose to apply here.
        </p>
      )}

      {skipped && (
        <p className="fund-card__skipped" role="status">
          ➡️ Skipped — you identified this as a poor fit.
          {(fitResult?.level === 'weak' || fitResult?.level === 'ineligible') && (
            <span> +10 Growth Points for good judgment! 🌿</span>
          )}
        </p>
      )}
    </article>
  );
}
