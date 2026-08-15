import { describe, expect, it } from 'vitest';
import {
  createInitialState,
  calculateFit,
  calculateMatchUnlocked,
  gameReducer,
  PROJECTS,
  FUNDS,
  scorePitch,
  PITCH_PHRASES,
  simulateCuration,
} from '../game.js';

describe('vanilla game module', () => {
  it('starts in the welcome phase', () => {
    expect(createInitialState().phase).toBe('welcome');
  });

  it('computes a strong fit for the green tea project and community spaces fund', () => {
    const result = calculateFit(PROJECTS[0], FUNDS[0]);
    expect(result.level).toBe('strong');
  });

  it('scores a complete pitch well', () => {
    const { score } = scorePitch(
      ['what-1', 'who-1', 'evidence-1', 'impact-1', 'engagement-1'],
      PITCH_PHRASES,
    );
    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('unlocks match using the match multiple', () => {
    expect(calculateMatchUnlocked(10, 3, 200)).toEqual({
      matchUnlocked: 30,
      totalRaised: 40,
      matchRemaining: 170,
    });
  });

  it('moves to choose-project on START_GAME', () => {
    const next = gameReducer(createInitialState(), { type: 'START_GAME' });
    expect(next.phase).toBe('choose-project');
  });

  it('uses the fund id when seeding curation', () => {
    const pitch = { fundId: 'x', phraseIds: [], score: 80, feedback: '' };
    const climateTech = simulateCuration(FUNDS[4], pitch, 2);
    const communityRadio = simulateCuration(FUNDS[2], pitch, 2);
    expect(climateTech.outcome).not.toBe(communityRadio.outcome);
  });
});
