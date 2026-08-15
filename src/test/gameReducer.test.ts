import { describe, it, expect } from 'vitest';
import { gameReducer, INITIAL_STATE } from '../game/gameReducer';
import { BOARD_SPACES } from '../data/encounters';
import type { GameState } from '../game/types';

describe('gameReducer', () => {
  it('moves from welcome to choose-project on START_GAME', () => {
    const s = gameReducer(INITIAL_STATE, { type: 'START_GAME' });
    expect(s.phase).toBe('choose-project');
  });

  it('moves to playing and resets position on SELECT_PROJECT', () => {
    const s = gameReducer(INITIAL_STATE, { type: 'SELECT_PROJECT', projectId: 'green-tea' });
    expect(s.phase).toBe('playing');
    expect(s.selectedProjectId).toBe('green-tea');
    expect(s.currentSpace).toBe(0);
    expect(s.growthPoints).toBe(0);
  });

  it('sets lastRoll and isMoving on ROLL_DIE', () => {
    const base: GameState = { ...INITIAL_STATE, phase: 'playing', encounterResolved: true };
    const s = gameReducer(base, { type: 'ROLL_DIE', value: 4 });
    expect(s.lastRoll).toBe(4);
    expect(s.isMoving).toBe(true);
  });

  it('advances token by one space on ADVANCE_TOKEN', () => {
    const base: GameState = {
      ...INITIAL_STATE,
      phase: 'playing',
      isMoving: true,
      lastRoll: 3,
      currentSpace: 0,
    };
    const s = gameReducer(base, { type: 'ADVANCE_TOKEN' });
    expect(s.currentSpace).toBe(1);
    expect(s.lastRoll).toBe(2); // remaining roll
  });

  it('stops moving when lastRoll reaches 1', () => {
    const base: GameState = {
      ...INITIAL_STATE,
      phase: 'playing',
      isMoving: true,
      lastRoll: 1,
      currentSpace: 5,
    };
    const s = gameReducer(base, { type: 'ADVANCE_TOKEN' });
    expect(s.isMoving).toBe(false);
    expect(s.currentSpace).toBe(6);
  });

  it('clamps position at totalSpaces', () => {
    const base: GameState = {
      ...INITIAL_STATE,
      phase: 'playing',
      isMoving: true,
      lastRoll: 5,
      currentSpace: 28,
    };
    const s = gameReducer(base, { type: 'ADVANCE_TOKEN' });
    expect(s.currentSpace).toBeLessThanOrEqual(30);
  });

  it('trellis advances position by trellisAdvance', () => {
    const trellisSpace = BOARD_SPACES.find((s) => s.type === 'trellis')!;
    const base: GameState = {
      ...INITIAL_STATE,
      phase: 'playing',
      currentSpace: trellisSpace.id,
      currentEncounter: trellisSpace,
    };
    const s = gameReducer(base, { type: 'RESOLVE_ENCOUNTER' });
    expect(s.currentSpace).toBe(
      Math.min(trellisSpace.id + (trellisSpace.trellisAdvance ?? 0), 30)
    );
  });

  it('root sets back position by rootSetback', () => {
    const rootSpace = BOARD_SPACES.find((s) => s.type === 'root')!;
    const base: GameState = {
      ...INITIAL_STATE,
      phase: 'playing',
      currentSpace: rootSpace.id,
      currentEncounter: rootSpace,
    };
    const s = gameReducer(base, { type: 'RESOLVE_ENCOUNTER' });
    expect(s.currentSpace).toBe(
      Math.max(rootSpace.id - (rootSpace.rootSetback ?? 0), 0)
    );
  });

  it('adds points for optimal decision', () => {
    const decisionSpace = BOARD_SPACES.find(
      (s) => s.type === 'decision' && s.options
    )!;
    const optimalOption = decisionSpace.options!.find((o) => o.isOptimal)!;
    const base: GameState = {
      ...INITIAL_STATE,
      phase: 'playing',
      currentSpace: decisionSpace.id,
      currentEncounter: decisionSpace,
    };
    const s = gameReducer(base, {
      type: 'RESOLVE_ENCOUNTER',
      optionId: optimalOption.id,
    });
    expect(s.growthPoints).toBeGreaterThan(0);
  });

  it('does not subtract points below 0 for non-optimal decisions', () => {
    const decisionSpace = BOARD_SPACES.find(
      (s) => s.type === 'decision' && s.options
    )!;
    const nonOptimal = decisionSpace.options!.find((o) => !o.isOptimal)!;
    const base: GameState = {
      ...INITIAL_STATE,
      phase: 'playing',
      growthPoints: 0,
      currentSpace: decisionSpace.id,
      currentEncounter: decisionSpace,
    };
    const s = gameReducer(base, {
      type: 'RESOLVE_ENCOUNTER',
      optionId: nonOptimal.id,
    });
    expect(s.growthPoints).toBeGreaterThanOrEqual(0);
  });

  it('SKIP_FUND adds 10 points and records skipped fund', () => {
    const s = gameReducer(INITIAL_STATE, { type: 'SKIP_FUND', fundId: 'climate-tech' });
    expect(s.skippedFundIds).toContain('climate-tech');
    expect(s.growthPoints).toBe(10);
  });

  it('SELECT_FUND records the selected fund', () => {
    const s = gameReducer(INITIAL_STATE, { type: 'SELECT_FUND', fundId: 'community-spaces' });
    expect(s.selectedFundIds).toContain('community-spaces');
  });

  it('ADD_POINTS adds to growthPoints', () => {
    const s = gameReducer(INITIAL_STATE, { type: 'ADD_POINTS', points: 25 });
    expect(s.growthPoints).toBe(25);
  });

  it('RESET_GAME returns to initial state', () => {
    const modified: GameState = { ...INITIAL_STATE, phase: 'garden-plan', growthPoints: 200 };
    const s = gameReducer(modified, { type: 'RESET_GAME' });
    expect(s.phase).toBe('welcome');
    expect(s.growthPoints).toBe(0);
  });

  it('GO_TO_GARDEN_PLAN transitions phase and awards points', () => {
    const s = gameReducer(INITIAL_STATE, { type: 'GO_TO_GARDEN_PLAN' });
    expect(s.phase).toBe('garden-plan');
    expect(s.growthPoints).toBe(50);
  });

  it('RESTORE_STATE restores saved state', () => {
    const saved: GameState = { ...INITIAL_STATE, phase: 'curation', growthPoints: 150, savedAt: 1234 };
    const s = gameReducer(INITIAL_STATE, { type: 'RESTORE_STATE', state: saved });
    expect(s.phase).toBe('curation');
    expect(s.growthPoints).toBe(150);
    expect(s.savedAt).toBe(1234);
  });

  it('stores reflection from RESOLVE_ENCOUNTER', () => {
    const reflectionSpace = BOARD_SPACES.find((s) => s.type === 'reflection')!;
    const base: GameState = {
      ...INITIAL_STATE,
      currentSpace: reflectionSpace.id,
      currentEncounter: reflectionSpace,
    };
    const s = gameReducer(base, {
      type: 'RESOLVE_ENCOUNTER',
      reflection: 'This is my reflection.',
    });
    if (reflectionSpace.reflectionKey) {
      expect(s.reflections[reflectionSpace.reflectionKey]).toBe('This is my reflection.');
    }
  });
});
