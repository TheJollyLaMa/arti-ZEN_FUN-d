import { useState } from 'react';
import type { Fund, PitchPhrase, Pitch } from '../../game/types';
import { PITCH_PHRASES } from '../../data/pitchPhrases';
import { scorePitch } from '../../game/scoring';
import './PitchBuilder.css';

const CATEGORIES: Array<{ id: PitchPhrase['category']; label: string; emoji: string }> = [
  { id: 'what', label: 'What your project does', emoji: '🌱' },
  { id: 'who', label: 'Who it serves', emoji: '👥' },
  { id: 'evidence', label: 'Evidence of fit', emoji: '📋' },
  { id: 'impact', label: 'What support makes possible', emoji: '🌟' },
  { id: 'engagement', label: 'How you will engage supporters', emoji: '📣' },
];

interface Props {
  fund: Fund;
  onSubmit: (pitch: Pitch) => void;
}

export default function PitchBuilder({ fund, onSubmit }: Props) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

  function togglePhrase(category: string, phraseId: string) {
    setSelected((prev) => ({
      ...prev,
      [category]: prev[category] === phraseId ? '' : phraseId,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const phraseIds = Object.values(selected).filter(Boolean);
    const res = scorePitch(phraseIds, PITCH_PHRASES);
    const pitch: Pitch = {
      fundId: fund.id,
      phraseIds,
      score: res.score,
      feedback: res.feedback,
    };
    setResult(res);
    setSubmitted(true);
    onSubmit(pitch);
  }

  const canSubmit = Object.values(selected).filter(Boolean).length >= 3;

  return (
    <section className="pitch-builder" aria-labelledby="pb-heading">
      <h3 id="pb-heading">Build Your Pitch for {fund.name}</h3>
      <p className="pitch-builder__intro">
        Choose one phrase per category to assemble your practice application. Select specific, evidence-based phrases for a stronger pitch.
      </p>
      <div className="simulated-notice" role="note">
        <span aria-hidden="true">⚠️</span>
        <span>This is a learning simulation. Your pitch is not submitted to any real Fund.</span>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="pitch-form">
          {CATEGORIES.map((cat) => {
            const phrases = PITCH_PHRASES.filter((p) => p.category === cat.id);
            return (
              <fieldset key={cat.id} className="pitch-fieldset">
                <legend className="pitch-legend">
                  {cat.emoji} {cat.label}
                </legend>
                <div className="pitch-options" role="radiogroup" aria-label={cat.label}>
                  {phrases.map((phrase) => (
                    <label
                      key={phrase.id}
                      className={[
                        'pitch-option',
                        selected[cat.id] === phrase.id ? 'pitch-option--selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <input
                        type="radio"
                        name={cat.id}
                        value={phrase.id}
                        checked={selected[cat.id] === phrase.id}
                        onChange={() => togglePhrase(cat.id, phrase.id)}
                        className="sr-only"
                      />
                      {phrase.text}
                      {!phrase.isSpecific && (
                        <span className="pitch-option__generic" aria-label="Generic phrase">(generic)</span>
                      )}
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
          >
            Submit Practice Pitch 📨
          </button>
          {!canSubmit && (
            <p className="pitch-hint">Select at least 3 categories to submit.</p>
          )}
        </form>
      ) : (
        result && (
          <div className="pitch-result animate-fade-in" role="alert">
            <div className={`pitch-score ${result.score >= 80 ? 'pitch-score--great' : result.score >= 50 ? 'pitch-score--ok' : 'pitch-score--low'}`}>
              Pitch score: <strong>{result.score}/100</strong>
            </div>
            <p className="pitch-feedback">{result.feedback}</p>
            {result.score >= 80 && <p className="pitch-bonus">+25 Growth Points for a tailored pitch! 🌱</p>}
          </div>
        )
      )}
    </section>
  );
}
