import { describe, it, expect } from 'vitest';
import { calculateFit, calculateAllFits } from '../game/fitEngine';
import type { Project, Fund } from '../game/types';

const greenTea: Project = {
  id: 'green-tea',
  name: 'Green Tea Gathering Space',
  description: 'A neighborhood gathering space.',
  traits: ['physical-space', 'community-building', 'ecological', 'wellness', 'arts-culture'],
};

const communitySpacesFund: Fund = {
  id: 'community-spaces',
  name: 'The Community Spaces Fund',
  mission: 'Supports recurring physical spaces.',
  eligibilityRequirements: ['Must operate a recurring physical space'],
  preferredTraits: ['physical-space', 'community-building', 'arts-culture', 'wellness'],
  excludedTraits: ['digital-only', 'extractive-land-use'],
  applicationStatus: 'open',
  sampleAvailableMatch: '$2,000 (simulated)',
  note: 'Simulated',
};

const climateOnlyFund: Fund = {
  id: 'climate-tech',
  name: 'The Climate Technology Fund',
  mission: 'Supports climate tech projects.',
  eligibilityRequirements: ['Must address climate change'],
  preferredTraits: ['climate-tech', 'education', 'open-knowledge', 'experimental-design'],
  excludedTraits: ['fossil-fuel-adjacent'],
  applicationStatus: 'open',
  sampleAvailableMatch: '$3,000 (simulated)',
  note: 'Simulated',
};

const excludingFund: Fund = {
  id: 'excl-fund',
  name: 'Exclusion Fund',
  mission: 'Excludes physical spaces.',
  eligibilityRequirements: [],
  preferredTraits: ['digital-only'],
  excludedTraits: ['physical-space'],
  applicationStatus: 'open',
  sampleAvailableMatch: '$500',
  note: 'Simulated',
};

describe('calculateFit', () => {
  it('returns strong fit when project has 3+ preferred traits', () => {
    const result = calculateFit(greenTea, communitySpacesFund);
    expect(result.level).toBe('strong');
    expect(result.matchingTraits.length).toBeGreaterThanOrEqual(3);
    expect(result.missingTraits.length).toBeGreaterThanOrEqual(0);
  });

  it('returns weak fit when few traits match', () => {
    const result = calculateFit(greenTea, climateOnlyFund);
    expect(result.level).toBe('weak');
    expect(result.matchingTraits.length).toBe(0);
  });

  it('returns ineligible when excluded trait matches', () => {
    const result = calculateFit(greenTea, excludingFund);
    expect(result.level).toBe('ineligible');
    expect(result.matchingTraits.length).toBe(0);
  });

  it('returns possible fit when 1-2 traits match', () => {
    const partialProject: Project = {
      id: 'partial',
      name: 'Partial Project',
      description: 'Partial',
      traits: ['physical-space'],
    };
    const result = calculateFit(partialProject, communitySpacesFund);
    expect(result.level).toBe('possible');
  });

  it('includes fundId in result', () => {
    const result = calculateFit(greenTea, communitySpacesFund);
    expect(result.fundId).toBe('community-spaces');
  });
});

describe('calculateAllFits', () => {
  it('returns one result per fund', () => {
    const funds = [communitySpacesFund, climateOnlyFund, excludingFund];
    const results = calculateAllFits(greenTea, funds);
    expect(results.length).toBe(3);
    expect(results.map((r) => r.fundId)).toEqual([
      'community-spaces',
      'climate-tech',
      'excl-fund',
    ]);
  });

  it('correctly identifies strong and ineligible in the same batch', () => {
    const funds = [communitySpacesFund, excludingFund];
    const results = calculateAllFits(greenTea, funds);
    expect(results.find((r) => r.fundId === 'community-spaces')?.level).toBe('strong');
    expect(results.find((r) => r.fundId === 'excl-fund')?.level).toBe('ineligible');
  });
});
