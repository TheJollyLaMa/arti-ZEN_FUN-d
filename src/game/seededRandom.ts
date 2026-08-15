/**
 * Seeded pseudo-random number generator (mulberry32 algorithm).
 * Used to make random outcomes deterministic and testable.
 */
export function createSeededRng(seed: number) {
  let s = seed >>> 0;
  return function next(): number {
    s += 0x6d2b79f5;
    let z = s;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

/** Return an integer in [min, max] inclusive using the given rng. */
export function randInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

/** Roll a six-sided die (1–6). */
export function rollD6(rng: () => number): number {
  return randInt(rng, 1, 6);
}
