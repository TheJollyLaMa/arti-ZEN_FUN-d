import './GardenGuide.css';

interface Props {
  message: string;
  onDismiss?: () => void;
}

export default function GardenGuide({ message, onDismiss }: Props) {
  return (
    <aside className="garden-guide" aria-label="Garden Guide Venus" role="complementary">
      <div className="garden-guide__avatar" aria-hidden="true">🦋</div>
      <div className="garden-guide__bubble">
        <p className="garden-guide__name">Venus says:</p>
        <p className="garden-guide__message">{message}</p>
        {onDismiss && (
          <button
            className="btn btn-secondary garden-guide__dismiss"
            onClick={onDismiss}
            aria-label="Dismiss guide message"
          >
            Got it ✓
          </button>
        )}
      </div>
    </aside>
  );
}
