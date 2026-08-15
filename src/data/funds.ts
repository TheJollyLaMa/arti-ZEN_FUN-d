import type { Fund } from '../game/types';

/**
 * Fictional sample Funds for learning purposes only.
 * ⚠️ All information is simulated. Do not use for actual funding decisions.
 * Check https://artizen.fund for current, accurate Fund information.
 *
 * Last reviewed: 2026-08-15
 */
export const FUNDS: Fund[] = [
  {
    id: 'community-spaces',
    name: 'The Community Spaces Fund',
    mission:
      'Supports recurring physical spaces that strengthen local communities through gathering, shared practice, and accessible programming.',
    eligibilityRequirements: [
      'Must operate a recurring physical gathering space',
      'Must serve a defined local or regional community',
      'Must have at least one completed public event',
    ],
    preferredTraits: [
      'physical-space',
      'community-building',
      'arts-culture',
      'wellness',
    ],
    excludedTraits: ['digital-only', 'extractive-land-use'],
    applicationStatus: 'open',
    sampleAvailableMatch: '$2,000 (simulated)',
    note: '⚠️ Simulated example. Verify all details at artizen.fund before applying.',
  },
  {
    id: 'creative-wellness',
    name: 'The Creative Wellness Fund',
    mission:
      'Supports projects at the intersection of creative practice and personal or community wellbeing.',
    eligibilityRequirements: [
      'Must demonstrate a clear wellness component',
      'Must involve creative or artistic practice',
      'Must be accessible to participants regardless of income',
    ],
    preferredTraits: [
      'wellness',
      'arts-culture',
      'community-building',
      'accessible-culture',
      'ecological',
    ],
    excludedTraits: ['for-profit-primary', 'clinical-only'],
    applicationStatus: 'open',
    sampleAvailableMatch: '$1,500 (simulated)',
    note: '⚠️ Simulated example. Verify all details at artizen.fund before applying.',
  },
  {
    id: 'community-radio',
    name: 'The Community Radio Fund',
    mission:
      'Supports grassroots audio, radio, podcasting, and neighborhood storytelling projects that center underrepresented voices.',
    eligibilityRequirements: [
      'Must produce audio or broadcast content',
      'Must center community voices, not commercial content',
      'Must be accessible to the public',
    ],
    preferredTraits: [
      'community-radio',
      'local-storytelling',
      'music',
      'accessible-culture',
      'public-performance',
    ],
    excludedTraits: ['commercial-broadcast', 'paywall-only'],
    applicationStatus: 'open',
    sampleAvailableMatch: '$1,800 (simulated)',
    note: '⚠️ Simulated example. Verify all details at artizen.fund before applying.',
  },
  {
    id: 'solidarity-economy',
    name: 'The Solidarity Economy Fund',
    mission:
      'Supports projects that model cooperative, community-owned, or solidarity-based economic structures.',
    eligibilityRequirements: [
      'Must demonstrate a community-ownership or cooperative structure',
      'Must prioritize equitable access over profit',
      'Must involve economic education or practice',
    ],
    preferredTraits: [
      'community-ownership',
      'open-knowledge',
      'community-building',
      'accessible-culture',
      'education',
    ],
    excludedTraits: ['investor-primary', 'extractive-finance'],
    applicationStatus: 'rolling',
    sampleAvailableMatch: '$2,500 (simulated)',
    note: '⚠️ Simulated example. Verify all details at artizen.fund before applying.',
  },
  {
    id: 'climate-tech',
    name: 'The Climate Technology Fund',
    mission:
      'Supports experimental projects combining technology, creative practice, and climate action or education.',
    eligibilityRequirements: [
      'Must address climate change, ecological resilience, or sustainability',
      'Must involve a technology or design component',
      'Must prioritize education or open access',
    ],
    preferredTraits: [
      'climate-tech',
      'education',
      'open-knowledge',
      'experimental-design',
      'community-ownership',
    ],
    excludedTraits: ['extractive-resource', 'fossil-fuel-adjacent'],
    applicationStatus: 'open',
    sampleAvailableMatch: '$3,000 (simulated)',
    note: '⚠️ Simulated example. Verify all details at artizen.fund before applying.',
  },
];
