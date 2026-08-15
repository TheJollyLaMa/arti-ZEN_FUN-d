import { useState } from 'react';
import './Spinner.css';

interface Props {
  onRoll: (value: number) => void;
  disabled: boolean;
  reducedMotion: boolean;
  /** Optional override for testing (makes roll deterministic) */
  rollOverride?: number;
}

const FACES = ['🌱', '🌿', '🌻', '🍄', '🌊', '☀️'];
const VALUES = [1, 2, 3, 4, 5, 6];

export default function Spinner({ onRoll, disabled, reducedMotion, rollOverride }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  function handleRoll() {
    if (disabled || spinning) return;
    const value =
      rollOverride !== undefined
        ? rollOverride
        : VALUES[Math.floor(Math.random() * VALUES.length)];

    if (reducedMotion) {
      setResult(value);
      onRoll(value);
      return;
    }

    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      setSpinning(false);
      setResult(value);
      onRoll(value);
    }, 600);
  }

  const faceIndex = result !== null ? result - 1 : 0;

  return (
    <div className="spinner-area">
      <div
        className={`die${spinning ? ' die--spinning' : ''}`}
        aria-live="polite"
        aria-label={
          result !== null
            ? `You rolled a ${result}`
            : 'Garden die, not yet rolled'
        }
        role="img"
      >
        <span aria-hidden="true">{FACES[faceIndex]}</span>
        {result !== null && (
          <span className="die__number">{result}</span>
        )}
      </div>
      <button
        className="btn btn-accent"
        onClick={handleRoll}
        disabled={disabled || spinning}
        aria-label="Roll the garden die"
      >
        {spinning ? 'Rolling…' : '🎲 Roll'}
      </button>
      {result !== null && (
        <p className="spinner-result" aria-live="polite">
          You rolled a <strong>{result}</strong>! Move {result} space{result !== 1 ? 's' : ''}.
        </p>
      )}
    </div>
  );
}
