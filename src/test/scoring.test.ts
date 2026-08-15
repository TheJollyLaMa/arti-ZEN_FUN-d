import { describe, it, expect } from 'vitest';
import { scorePitch, calculateMatchUnlocked, SCORE } from '../game/scoring';

const phrases = [
  { id: 'what-1', category: 'what', isSpecific: true },
  { id: 'what-4', category: 'what', isSpecific: false },
  { id: 'who-1', category: 'who', isSpecific: true },
  { id: 'who-4', category: 'who', isSpecific: false },
  { id: 'evidence-1', category: 'evidence', isSpecific: true },
  { id: 'impact-1', category: 'impact', isSpecific: true },
  { id: 'engagement-1', category: 'engagement', isSpecific: true },
  { id: 'engagement-4', category: 'engagement', isSpecific: false },
];

describe('scorePitch', () => {
  it('scores high when all 5 categories covered with specific phrases', () => {
    const { score } = scorePitch(
      ['what-1', 'who-1', 'evidence-1', 'impact-1', 'engagement-1'],
      phrases
    );
    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('scores lower when generic phrases are used', () => {
    const { score } = scorePitch(
      ['what-4', 'who-4', 'evidence-1', 'impact-1', 'engagement-4'],
      phrases
    );
    expect(score).toBeLessThan(80);
  });

  it('scores lowest when only 1 category covered with generic phrase', () => {
    const { score } = scorePitch(['what-4'], phrases); // generic phrase, 1 category
    // 1 category = 10 category score, 0 specificity score → 10
    expect(score).toBeLessThan(30);
  });

  it('provides feedback string', () => {
    const { feedback } = scorePitch(['what-1', 'who-1', 'evidence-1', 'impact-1', 'engagement-1'], phrases);
    expect(typeof feedback).toBe('string');
    expect(feedback.length).toBeGreaterThan(0);
  });

  it('returns 0 score for empty pitch', () => {
    const { score } = scorePitch([], phrases);
    expect(score).toBe(0);
  });
});

describe('calculateMatchUnlocked', () => {
  it('unlocks correct amount with 3x multiple', () => {
    const { matchUnlocked, totalRaised, matchRemaining } =
      calculateMatchUnlocked(10, 3, 200);
    expect(matchUnlocked).toBe(30);
    expect(totalRaised).toBe(40);
    expect(matchRemaining).toBe(170);
  });

  it('caps match at available amount', () => {
    const { matchUnlocked, matchRemaining } =
      calculateMatchUnlocked(100, 3, 50);
    expect(matchUnlocked).toBe(50);
    expect(matchRemaining).toBe(0);
  });

  it('unlocks nothing when sale is 0', () => {
    const { matchUnlocked, totalRaised } = calculateMatchUnlocked(0, 3, 200);
    expect(matchUnlocked).toBe(0);
    expect(totalRaised).toBe(0);
  });

  it('correctly handles exact exhaustion', () => {
    const { matchUnlocked, matchRemaining } = calculateMatchUnlocked(10, 3, 30);
    expect(matchUnlocked).toBe(30);
    expect(matchRemaining).toBe(0);
  });

  it('SCORE constants are defined', () => {
    expect(SCORE.IDENTIFY_STRONG_FIT).toBe(20);
    expect(SCORE.UNLOCK_ALL_MATCH).toBe(200);
    expect(SCORE.COMPLETE_GARDEN_PLAN).toBe(50);
  });
});
