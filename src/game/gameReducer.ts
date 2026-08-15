import type { GameState, GameAction, BoardSpace } from './types';
import { BOARD_SPACES } from '../data/encounters';
import { RULES } from '../data/rules';

export const INITIAL_STATE: GameState = {
  phase: 'welcome',
  selectedProjectId: null,
  currentSpace: 0,
  totalSpaces: RULES.totalSpaces,
  growthPoints: 0,
  isMoving: false,
  lastRoll: null,
  completedSpaces: [],
  currentEncounter: null,
  encounterResolved: true,
  fitResults: [],
  selectedFundIds: [],
  skippedFundIds: [],
  pitches: [],
  curationResults: [],
  fundDriveResults: [],
  reflections: {},
  reducedMotion: false,
  soundEnabled: false,
  seedValue: Date.now(),
  savedAt: null,
};

/** Get the board space at a given position (1-indexed). */
function getSpace(position: number): BoardSpace | null {
  return BOARD_SPACES.find((s) => s.id === position) ?? null;
}

/** Clamp position to valid board range. */
function clampPosition(pos: number): number {
  return Math.max(0, Math.min(RULES.totalSpaces, pos));
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, phase: 'choose-project' };

    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProjectId: action.projectId,
        phase: 'playing',
        currentSpace: 0,
        completedSpaces: [],
        growthPoints: 0,
      };

    case 'ROLL_DIE':
      return {
        ...state,
        lastRoll: action.value,
        isMoving: true,
        encounterResolved: true,
      };

    case 'ADVANCE_TOKEN': {
      if (!state.isMoving || state.lastRoll === null) return state;
      const newPos = clampPosition(state.currentSpace + 1);
      const completedSpaces = state.completedSpaces.includes(state.currentSpace)
        ? state.completedSpaces
        : [...state.completedSpaces, state.currentSpace];
      // Still more spaces to move?
      const remaining = state.lastRoll - 1;
      if (newPos >= RULES.totalSpaces) {
        // Reached end of board
        return {
          ...state,
          currentSpace: newPos,
          completedSpaces,
          isMoving: false,
          lastRoll: null,
          phase: 'select-funds',
        };
      }
      if (remaining <= 0) {
        // Done moving — land on space
        const space = getSpace(newPos);
        return {
          ...state,
          currentSpace: newPos,
          completedSpaces,
          isMoving: false,
          lastRoll: null,
          currentEncounter: space,
          encounterResolved: space === null,
        };
      }
      return {
        ...state,
        currentSpace: newPos,
        completedSpaces,
        lastRoll: remaining,
      };
    }

    case 'LAND_ON_SPACE': {
      const space = action.space;
      let nextPos = state.currentSpace;
      if (space.type === 'trellis' && space.trellisAdvance) {
        nextPos = clampPosition(state.currentSpace + space.trellisAdvance);
      } else if (space.type === 'root' && space.rootSetback) {
        nextPos = clampPosition(state.currentSpace - space.rootSetback);
      }
      return {
        ...state,
        currentSpace: nextPos,
        currentEncounter: space,
        encounterResolved: false,
      };
    }

    case 'RESOLVE_ENCOUNTER': {
      if (!state.currentEncounter) return { ...state, encounterResolved: true };
      let pointsGain = 0;
      let nextPos = state.currentSpace;
      const space = state.currentEncounter;

      // Handle trellis/root position changes
      if (space.type === 'trellis' && space.trellisAdvance) {
        nextPos = clampPosition(state.currentSpace + space.trellisAdvance);
      } else if (space.type === 'root' && space.rootSetback) {
        nextPos = clampPosition(state.currentSpace - space.rootSetback);
      }

      // Handle decision/soil-test option scoring
      if (action.optionId && space.options) {
        const option = space.options.find((o) => o.id === action.optionId);
        if (option) {
          pointsGain = Math.max(0, option.pointsEffect);
        }
      }

      // Wild bloom bonus
      if (space.type === 'wild-bloom') {
        pointsGain += 5;
      }

      // Reflection
      const reflections = { ...state.reflections };
      if (space.reflectionKey && action.reflection) {
        reflections[space.reflectionKey] = action.reflection;
      }

      const newPos =
        space.type === 'trellis' || space.type === 'root'
          ? nextPos
          : state.currentSpace;

      return {
        ...state,
        currentSpace: newPos,
        encounterResolved: true,
        currentEncounter: null,
        growthPoints: state.growthPoints + pointsGain,
        reflections,
      };
    }

    case 'ADD_POINTS':
      return { ...state, growthPoints: state.growthPoints + action.points };

    case 'GO_TO_SELECT_FUNDS':
      return { ...state, phase: 'select-funds' };

    case 'SELECT_FUND':
      if (state.selectedFundIds.includes(action.fundId)) return state;
      return {
        ...state,
        selectedFundIds: [...state.selectedFundIds, action.fundId],
      };

    case 'SKIP_FUND':
      if (state.skippedFundIds.includes(action.fundId)) return state;
      return {
        ...state,
        skippedFundIds: [...state.skippedFundIds, action.fundId],
        growthPoints: state.growthPoints + 10, // reward for correct skip
      };

    case 'ADD_FIT_RESULT': {
      const existing = state.fitResults.findIndex(
        (r) => r.fundId === action.result.fundId
      );
      const fitResults =
        existing >= 0
          ? state.fitResults.map((r, i) =>
              i === existing ? action.result : r
            )
          : [...state.fitResults, action.result];
      return { ...state, fitResults };
    }

    case 'GO_TO_BUILD_PITCH':
      return { ...state, phase: 'build-pitch' };

    case 'SUBMIT_PITCH': {
      const existing = state.pitches.findIndex(
        (p) => p.fundId === action.pitch.fundId
      );
      const pitches =
        existing >= 0
          ? state.pitches.map((p, i) =>
              i === existing ? action.pitch : p
            )
          : [...state.pitches, action.pitch];
      return {
        ...state,
        pitches,
        growthPoints: state.growthPoints + 10, // completion points
      };
    }

    case 'GO_TO_CURATION':
      return { ...state, phase: 'curation' };

    case 'ADD_CURATION_RESULT': {
      const existing = state.curationResults.findIndex(
        (r) => r.fundId === action.result.fundId
      );
      const curationResults =
        existing >= 0
          ? state.curationResults.map((r, i) =>
              i === existing ? action.result : r
            )
          : [...state.curationResults, action.result];
      let bonus = 0;
      if (action.result.outcome === 'curated') bonus = 50;
      else if (action.result.outcome === 'needs-clarification') bonus = 10;
      return {
        ...state,
        curationResults,
        growthPoints: state.growthPoints + bonus,
      };
    }

    case 'GO_TO_FUND_DRIVE':
      return { ...state, phase: 'fund-drive' };

    case 'ADD_FUND_DRIVE_RESULT': {
      const existing = state.fundDriveResults.findIndex(
        (r) => r.fundId === action.result.fundId
      );
      const fundDriveResults =
        existing >= 0
          ? state.fundDriveResults.map((r, i) =>
              i === existing ? action.result : r
            )
          : [...state.fundDriveResults, action.result];
      const allUnlocked = action.result.matchRemaining === 0;
      return {
        ...state,
        fundDriveResults,
        growthPoints:
          state.growthPoints + (allUnlocked ? 200 : 0),
      };
    }

    case 'GO_TO_GARDEN_PLAN':
      return {
        ...state,
        phase: 'garden-plan',
        growthPoints: state.growthPoints + 50,
      };

    case 'COMPLETE_GAME':
      return { ...state, phase: 'complete' };

    case 'TOGGLE_REDUCED_MOTION':
      return { ...state, reducedMotion: !state.reducedMotion };

    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };

    case 'RESET_GAME':
      return { ...INITIAL_STATE, seedValue: Date.now() };

    case 'RESTORE_STATE':
      return action.state;

    default:
      return state;
  }
}
