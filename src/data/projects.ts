import type { Project } from '../game/types';

export const PROJECTS: Project[] = [
  {
    id: 'green-tea',
    name: 'Green Tea Gathering Space',
    description:
      'A neighborhood space combining tea ceremony, ecological practice, art, and recurring community gatherings.',
    traits: [
      'physical-space',
      'community-building',
      'ecological',
      'wellness',
      'arts-culture',
    ],
  },
  {
    id: 'streetwave-radio',
    name: 'Streetwave Community Radio',
    description:
      'A community radio, live music, busking, and neighborhood storytelling project.',
    traits: [
      'community-radio',
      'public-performance',
      'local-storytelling',
      'music',
      'accessible-culture',
    ],
  },
  {
    id: 'solar-commons',
    name: 'Solar Commons Lab',
    description:
      'An experimental creative technology project exploring community-owned solar tools and climate education.',
    traits: [
      'climate-tech',
      'education',
      'open-knowledge',
      'community-ownership',
      'experimental-design',
    ],
  },
];
