import type { BoardSpace, GameState } from '../../game/types';
import { BOARD_SPACES } from '../../data/encounters';
import './Board.css';

const ZONE_LABELS: Record<string, string> = {
  plant: '🌱 Plant',
  explore: '🔍 Explore',
  cultivate: '✂️ Cultivate',
  curate: '🌸 Curate',
  bloom: '🌻 Bloom',
};

const SPACE_ICONS: Record<string, string> = {
  path: '⬜',
  decision: '🔀',
  'soil-test': '🪱',
  trellis: '⬆️',
  root: '⬇️',
  'garden-guide': '🦋',
  'wild-bloom': '🌼',
  reflection: '💭',
};

interface Props {
  state: GameState;
  listView?: boolean;
}

export default function Board({ state, listView = false }: Props) {
  const spaces = BOARD_SPACES;
  const { currentSpace, completedSpaces } = state;

  if (listView) {
    return <BoardListView spaces={spaces} currentSpace={currentSpace} completedSpaces={completedSpaces} />;
  }

  return (
    <div className="board" role="region" aria-label="Garden path board">
      <div className="board__zones">
        {(['plant', 'explore', 'cultivate', 'curate', 'bloom'] as const).map((zone) => (
          <span key={zone} className={`zone-label zone-label--${zone}`}>
            {ZONE_LABELS[zone]}
          </span>
        ))}
      </div>
      <div className="board__path" role="list" aria-label="Board spaces">
        {/* Start */}
        <div className="space space--start" role="listitem" aria-label="Start — your garden begins here">
          <span aria-hidden="true">🌱</span>
          <span className="space__label">Start</span>
          {currentSpace === 0 && (
            <span className="token" aria-label="Your token is here" aria-hidden="true">🪴</span>
          )}
        </div>

        {spaces.map((space) => {
          const isActive = space.id === currentSpace;
          const isCompleted = completedSpaces.includes(space.id);

          return (
            <div
              key={space.id}
              role="listitem"
              className={[
                'space',
                `space--${space.type}`,
                `space--zone-${space.zone}`,
                isActive ? 'space--active' : '',
                isCompleted ? 'space--completed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-label={`Space ${space.id}: ${space.title}${isActive ? ' — you are here' : ''}${isCompleted ? ' — completed' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="space__number">{space.id}</span>
              <span className="space__icon" aria-hidden="true">
                {SPACE_ICONS[space.type] ?? '⬜'}
              </span>
              <span className="space__title">{space.title}</span>
              {isActive && (
                <span className="token" aria-label="Your token" aria-hidden="true">🪴</span>
              )}
            </div>
          );
        })}

        {/* End */}
        <div className="space space--end" role="listitem" aria-label="The Harvest Table — goal">
          <span aria-hidden="true">🌾</span>
          <span className="space__label">Harvest</span>
          {currentSpace >= 30 && (
            <span className="token" aria-label="Your token is here" aria-hidden="true">🪴</span>
          )}
        </div>
      </div>
    </div>
  );
}

function BoardListView({
  spaces,
  currentSpace,
  completedSpaces,
}: {
  spaces: BoardSpace[];
  currentSpace: number;
  completedSpaces: number[];
}) {
  return (
    <section aria-labelledby="list-board-heading">
      <h3 id="list-board-heading" className="sr-only">
        Board spaces list view
      </h3>
      <ol className="board-list">
        <li className={`board-list__item ${currentSpace === 0 ? 'board-list__item--active' : ''}`}>
          <strong>Start</strong> — your garden begins here
        </li>
        {spaces.map((space) => (
          <li
            key={space.id}
            className={[
              'board-list__item',
              currentSpace === space.id ? 'board-list__item--active' : '',
              completedSpaces.includes(space.id) ? 'board-list__item--completed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-current={currentSpace === space.id ? 'step' : undefined}
          >
            <span className="board-list__num">{space.id}.</span>{' '}
            <strong>{space.title}</strong>{' '}
            <span className="board-list__zone">({ZONE_LABELS[space.zone]})</span>{' '}
            <span className="board-list__type">— {space.type.replace(/-/g, ' ')}</span>
            {currentSpace === space.id && (
              <span aria-label=" — you are here"> 🪴</span>
            )}
          </li>
        ))}
        <li className={`board-list__item ${currentSpace >= 30 ? 'board-list__item--active' : ''}`}>
          <strong>30+ Harvest Table</strong> — game complete
        </li>
      </ol>
    </section>
  );
}
