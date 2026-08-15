import { describe, it, expect } from 'vitest';
import { simulateCuration } from '../components/Encounters/CurationSimulator';
import type { Fund, Pitch } from '../game/types';

const fund: Fund = {
  id: 'community-spaces',
  name: 'The Community Spaces Fund',
  mission: 'Test fund',
  eligibilityRequirements: [],
  preferredTraits: [],
  excludedTraits: [],
  applicationStatus: 'open',
  sampleAvailableMatch: '$2,000 (simulated)',
  note: 'Simulated',
};

describe('simulateCuration', () => {
  it('returns curated for high-score pitch with a favorable seed', () => {
    const pitch: Pitch = { fundId: 'community-spaces', phraseIds: [], score: 90, feedback: '' };
    const result = simulateCuration(fund, pitch, 0);
    // With seed 0 and score 90, result should be curated or needs-clarification
    expect(['curated', 'needs-clarification']).toContain(result.outcome);
  });

  it('returns not-eligible for very low-score pitch', () => {
    const pitch: Pitch = { fundId: 'community-spaces', phraseIds: [], score: 10, feedback: '' };
    const result = simulateCuration(fund, pitch, 100);
    expect(result.outcome).toBe('not-eligible');
  });

  it('is deterministic — same inputs produce same output', () => {
    const pitch: Pitch = { fundId: 'community-spaces', phraseIds: [], score: 75, feedback: '' };
    const r1 = simulateCuration(fund, pitch, 42);
    const r2 = simulateCuration(fund, pitch, 42);
    expect(r1.outcome).toBe(r2.outcome);
    expect(r1.explanation).toBe(r2.explanation);
  });

  it('always includes explanation', () => {
    const pitch: Pitch = { fundId: 'community-spaces', phraseIds: [], score: 50, feedback: '' };
    const result = simulateCuration(fund, pitch, 7);
    expect(typeof result.explanation).toBe('string');
    expect(result.explanation.length).toBeGreaterThan(0);
  });

  it('fundId in result matches fund', () => {
    const pitch: Pitch = { fundId: 'community-spaces', phraseIds: [], score: 60, feedback: '' };
    const result = simulateCuration(fund, pitch, 5);
    expect(result.fundId).toBe('community-spaces');
  });
});
