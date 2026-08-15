import { useState } from 'react';
import type { Fund, FundDriveResult } from '../../game/types';
import { calculateMatchUnlocked } from '../../game/scoring';
import { RULES } from '../../data/rules';
import './MatchSimulator.css';

interface Props {
  curatedFunds: Fund[];
  matchMultiple?: number;
  onComplete: (results: FundDriveResult[]) => void;
}

const STRATEGIES = [
  {
    id: 'large',
    label: 'Ask one supporter for a large purchase',
    saleAmount: 50,
    description: 'One supporter buys a $50 Artifact.',
  },
  {
    id: 'small',
    label: 'Invite several supporters to make small purchases',
    saleAmount: 10,
    description: 'Five supporters each buy a $10 Artifact ($50 total).',
    multiplier: 5,
  },
  {
    id: 'wait',
    label: 'Wait and communicate nothing',
    saleAmount: 0,
    description: 'No outreach. No purchases.',
  },
];

export default function MatchSimulator({ curatedFunds, matchMultiple = RULES.defaultMatchMultiple, onComplete }: Props) {
  const [strategy, setStrategy] = useState<string | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [results, setResults] = useState<FundDriveResult[]>([]);

  function runSimulation() {
    if (!strategy) return;
    const strat = STRATEGIES.find((s) => s.id === strategy)!;

    const singleSale = strat.saleAmount;
    const totalSales = singleSale * (strat.multiplier ?? 1);

    const fundResults: FundDriveResult[] = curatedFunds.map((fund) => {
      const matchAvailable = RULES.simulatedMatchAvailable; // simulated per-fund available match
      let totalMatch = 0;
      let totalSalesAmt = 0;

      if (strategy === 'small') {
        // 5 × $10 sales
        let remaining = matchAvailable;
        for (let i = 0; i < 5; i++) {
          const { matchUnlocked, matchRemaining } = calculateMatchUnlocked(10, matchMultiple, remaining);
          totalMatch += matchUnlocked;
          remaining = matchRemaining;
          totalSalesAmt += 10;
        }
      } else {
        const { matchUnlocked } = calculateMatchUnlocked(singleSale, matchMultiple, matchAvailable);
        totalMatch = matchUnlocked;
        totalSalesAmt = totalSales;
      }

      return {
        fundId: fund.id,
        artifactSales: totalSalesAmt,
        matchAvailable,
        matchUnlocked: totalMatch,
        matchRemaining: matchAvailable - totalMatch,
        matchMultiple,
        totalRaised: totalSalesAmt + totalMatch,
      };
    });

    setResults(fundResults);
    setSimulated(true);
    onComplete(fundResults);
  }

  const strategyFeedback: Record<string, string> = {
    large: 'A single large supporter can unlock significant match — but reaching them requires clear, direct communication.',
    small: 'Multiple small purchases can add up and may unlock more total match through community engagement.',
    wait: 'Without outreach, supporters don\'t know the Fund Drive is happening. Match often goes unlocked when creators stay silent.',
  };

  return (
    <section className="match-sim" aria-labelledby="ms-heading">
      <h3 id="ms-heading">Fund Drive Simulation 🌻</h3>
      <div className="simulated-notice" role="note">
        <span aria-hidden="true">⚠️</span>
        <span>
          All amounts below are teaching examples. Match Multiple: <strong>{matchMultiple}x</strong> (simulated).{' '}
          {RULES.verifyDisclaimer}
        </span>
      </div>

      <p className="match-sim__intro">
        Your project is curated! A Fund Drive is now active. Choose a supporter engagement strategy:
      </p>

      {!simulated ? (
        <>
          <div className="match-strat-group" role="radiogroup" aria-label="Supporter strategy">
            {STRATEGIES.map((s) => (
              <label
                key={s.id}
                className={['match-strat', strategy === s.id ? 'match-strat--selected' : ''].filter(Boolean).join(' ')}
              >
                <input
                  type="radio"
                  name="strategy"
                  value={s.id}
                  checked={strategy === s.id}
                  onChange={() => setStrategy(s.id)}
                  className="sr-only"
                />
                <span className="match-strat__label">{s.label}</span>
                <span className="match-strat__desc">{s.description}</span>
              </label>
            ))}
          </div>

          <button
            className="btn btn-primary"
            onClick={runSimulation}
            disabled={!strategy}
          >
            Run Simulation 🌱
          </button>
        </>
      ) : (
        <div className="match-sim__results animate-fade-in">
          {strategy && (
            <div className="match-strat-feedback">
              <strong>Strategy feedback:</strong> {strategyFeedback[strategy]}
            </div>
          )}

          {results.map((res) => {
            const fund = curatedFunds.find((f) => f.id === res.fundId);
            return (
              <div key={res.fundId} className="match-fund-result card">
                <h4 className="match-fund-result__name">{fund?.name}</h4>
                <dl className="match-stats">
                  <div className="match-stat">
                    <dt>Match Multiple</dt>
                    <dd>{res.matchMultiple}x <em>(simulated)</em></dd>
                  </div>
                  <div className="match-stat">
                    <dt>Artifact Sales</dt>
                    <dd>${res.artifactSales} <em>(simulated)</em></dd>
                  </div>
                  <div className="match-stat">
                    <dt>Match Available</dt>
                    <dd>${res.matchAvailable} <em>(simulated)</em></dd>
                  </div>
                  <div className="match-stat">
                    <dt>Match Unlocked</dt>
                    <dd className={res.matchUnlocked > 0 ? 'match-stat--good' : ''}>${res.matchUnlocked} <em>(simulated)</em></dd>
                  </div>
                  <div className="match-stat">
                    <dt>Match Remaining</dt>
                    <dd>${res.matchRemaining} <em>(simulated)</em></dd>
                  </div>
                  <div className="match-stat match-stat--total">
                    <dt>Total Raised</dt>
                    <dd>${res.totalRaised} <em>(simulated)</em></dd>
                  </div>
                </dl>
                {res.matchRemaining === 0 && (
                  <p className="match-all-unlocked" role="status">
                    🌻 All available match unlocked! +200 Growth Points!
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
