import { describe, it, expect } from 'vitest';
import { createSeededRng, rollD6, randInt } from '../game/seededRandom';

describe('createSeededRng', () => {
  it('produces values in [0, 1)', () => {
    const rng = createSeededRng(42);
    for (let i = 0; i < 100; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('is deterministic — same seed yields same sequence', () => {
    const rng1 = createSeededRng(12345);
    const rng2 = createSeededRng(12345);
    for (let i = 0; i < 20; i++) {
      expect(rng1()).toBe(rng2());
    }
  });

  it('different seeds produce different sequences', () => {
    const rng1 = createSeededRng(1);
    const rng2 = createSeededRng(2);
    const vals1 = Array.from({ length: 10 }, () => rng1());
    const vals2 = Array.from({ length: 10 }, () => rng2());
    expect(vals1).not.toEqual(vals2);
  });
});

describe('rollD6', () => {
  it('always returns 1–6', () => {
    const rng = createSeededRng(99);
    for (let i = 0; i < 200; i++) {
      const r = rollD6(rng);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(6);
    }
  });
});

describe('randInt', () => {
  it('produces integers within the given range', () => {
    const rng = createSeededRng(7);
    for (let i = 0; i < 100; i++) {
      const r = randInt(rng, 3, 8);
      expect(r).toBeGreaterThanOrEqual(3);
      expect(r).toBeLessThanOrEqual(8);
      expect(Number.isInteger(r)).toBe(true);
    }
  });
});
