import { useState } from 'react';
import type { BoardSpace, DecisionOption } from '../../game/types';
import GardenGuide from '../GardenGuide/GardenGuide';
import './Encounters.css';

interface Props {
  space: BoardSpace;
  onResolve: (optionId?: string, reflection?: string) => void;
}

export default function Encounters({ space, onResolve }: Props) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  function handleOptionClick(option: DecisionOption) {
    setChosen(option.id);
    setShowFeedback(true);
  }

  function handleContinue() {
    onResolve(chosen ?? undefined, reflection || undefined);
  }

  function handleReflectionSubmit(e: React.FormEvent) {
    e.preventDefault();
    onResolve(undefined, reflection);
  }

  const typeLabel: Record<string, string> = {
    path: 'Path',
    decision: 'Decision',
    'soil-test': 'Soil Test',
    trellis: 'Trellis',
    root: 'Root',
    'garden-guide': 'Garden Guide',
    'wild-bloom': 'Wild Bloom',
    reflection: 'Reflection',
  };

  return (
    <div className={`encounter encounter--${space.type}`} role="region" aria-labelledby="enc-title">
      <div className="encounter__header">
        <span className="encounter__type-badge">{typeLabel[space.type]}</span>
        <span className="encounter__zone">{space.zone.charAt(0).toUpperCase() + space.zone.slice(1)}</span>
      </div>

      <h3 id="enc-title" className="encounter__title">{space.title}</h3>
      <p className="encounter__content">{space.content}</p>

      {/* Garden Guide message */}
      {space.type === 'garden-guide' && space.guideMessage && (
        <GardenGuide
          message={space.guideMessage}
          onDismiss={handleContinue}
        />
      )}

      {/* Decision / Soil Test options */}
      {(space.type === 'decision' || space.type === 'soil-test') &&
        space.options && (
          <div className="encounter__options" role="group" aria-label="Choose an answer">
            {space.options.map((option) => (
              <button
                key={option.id}
                className={[
                  'option-btn',
                  chosen === option.id ? 'option-btn--chosen' : '',
                  showFeedback && option.isOptimal ? 'option-btn--optimal' : '',
                  showFeedback && chosen === option.id && !option.isOptimal
                    ? 'option-btn--wrong'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => !showFeedback && handleOptionClick(option)}
                disabled={showFeedback}
                aria-pressed={chosen === option.id}
              >
                {option.text}
              </button>
            ))}

            {showFeedback && chosen && (
              <div className="encounter__feedback animate-fade-in" role="alert">
                {(() => {
                  const opt = space.options!.find((o) => o.id === chosen);
                  return (
                    <>
                      <p className={opt?.isOptimal ? 'feedback--good' : 'feedback--neutral'}>
                        {opt?.isOptimal ? '✅ ' : 'ℹ️ '}
                        {opt?.feedback}
                      </p>
                      {(opt?.pointsEffect ?? 0) > 0 && (
                        <p className="feedback__points">
                          +{opt!.pointsEffect} Growth Points 🌱
                        </p>
                      )}
                      <button className="btn btn-primary" onClick={handleContinue}>
                        Continue →
                      </button>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

      {/* Trellis */}
      {space.type === 'trellis' && (
        <div className="encounter__trellis animate-fade-in">
          <p className="trellis-msg">
            🧗 You advance <strong>{space.trellisAdvance}</strong> extra space{space.trellisAdvance !== 1 ? 's' : ''}!
          </p>
          <button className="btn btn-primary" onClick={handleContinue}>
            Climb the Trellis →
          </button>
        </div>
      )}

      {/* Root */}
      {space.type === 'root' && (
        <div className="encounter__root animate-fade-in">
          <p className="root-msg">
            🌱 You follow the root back <strong>{space.rootSetback}</strong> space{space.rootSetback !== 1 ? 's' : ''}.
            Every setback carries a lesson.
          </p>
          <button className="btn btn-primary" onClick={handleContinue}>
            Follow the Root →
          </button>
        </div>
      )}

      {/* Wild Bloom */}
      {space.type === 'wild-bloom' && (
        <div className="encounter__bloom animate-fade-in">
          <p className="bloom-msg">🌼 +5 Growth Points!</p>
          <button className="btn btn-accent" onClick={handleContinue}>
            Keep Growing →
          </button>
        </div>
      )}

      {/* Path */}
      {space.type === 'path' && (
        <div className="encounter__path">
          <button className="btn btn-primary" onClick={handleContinue}>
            Move On →
          </button>
        </div>
      )}

      {/* Reflection */}
      {space.type === 'reflection' && (
        <form className="encounter__reflection" onSubmit={handleReflectionSubmit}>
          <label htmlFor="reflection-input" className="reflection-label">
            Your thoughts (optional):
          </label>
          <textarea
            id="reflection-input"
            className="reflection-textarea"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={3}
            placeholder="Write freely — your response is saved only in your browser."
            aria-describedby="reflection-hint"
          />
          <p id="reflection-hint" className="reflection-hint">
            Your reflection will appear in your final Garden Plan.
          </p>
          <button type="submit" className="btn btn-primary">
            Save Reflection →
          </button>
        </form>
      )}
    </div>
  );
}
