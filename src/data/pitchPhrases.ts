import type { PitchPhrase } from '../game/types';

/**
 * Phrase cards used in the Pitch Builder activity.
 * Players assemble pitches by selecting one phrase per category.
 * isSpecific = true means the phrase provides concrete, relevant evidence.
 */
export const PITCH_PHRASES: PitchPhrase[] = [
  // ── What does the project do? ──────────────────────────────────────────
  {
    id: 'what-1',
    category: 'what',
    text: 'Our project creates a recurring gathering space for community members.',
    isSpecific: true,
  },
  {
    id: 'what-2',
    category: 'what',
    text: 'We produce community radio content centering neighborhood voices.',
    isSpecific: true,
  },
  {
    id: 'what-3',
    category: 'what',
    text: 'We develop open-source tools for community-owned solar education.',
    isSpecific: true,
  },
  {
    id: 'what-4',
    category: 'what',
    text: 'We do creative work that makes people feel good.',
    isSpecific: false,
  },
  {
    id: 'what-5',
    category: 'what',
    text: 'Our project is innovative and forward-thinking.',
    isSpecific: false,
  },

  // ── Who does it serve? ─────────────────────────────────────────────────
  {
    id: 'who-1',
    category: 'who',
    text: 'We serve residents of the Eastside neighborhood, many of whom have no existing third spaces nearby.',
    isSpecific: true,
  },
  {
    id: 'who-2',
    category: 'who',
    text: 'We center local artists, musicians, and storytellers who lack access to broadcast platforms.',
    isSpecific: true,
  },
  {
    id: 'who-3',
    category: 'who',
    text: 'We work with low-income households and youth groups exploring renewable energy access.',
    isSpecific: true,
  },
  {
    id: 'who-4',
    category: 'who',
    text: 'We serve everyone who is interested in our work.',
    isSpecific: false,
  },
  {
    id: 'who-5',
    category: 'who',
    text: 'Our audience is people who care about community.',
    isSpecific: false,
  },

  // ── Evidence connecting to Fund eligibility ────────────────────────────
  {
    id: 'evidence-1',
    category: 'evidence',
    text: 'We have hosted 12 free monthly gatherings over the past year, averaging 40 attendees each.',
    isSpecific: true,
  },
  {
    id: 'evidence-2',
    category: 'evidence',
    text: 'We have broadcast 52 episodes featuring 30 different community voices, all available for free.',
    isSpecific: true,
  },
  {
    id: 'evidence-3',
    category: 'evidence',
    text: 'Our open-source curriculum has been downloaded by 200+ educators and is freely licensed.',
    isSpecific: true,
  },
  {
    id: 'evidence-4',
    category: 'evidence',
    text: 'We have done events and people enjoyed them.',
    isSpecific: false,
  },
  {
    id: 'evidence-5',
    category: 'evidence',
    text: 'Our project is well-known in our community.',
    isSpecific: false,
  },

  // ── What could additional support make possible? ───────────────────────
  {
    id: 'impact-1',
    category: 'impact',
    text: 'Match support would allow us to secure a permanent lease and expand from monthly to weekly events.',
    isSpecific: true,
  },
  {
    id: 'impact-2',
    category: 'impact',
    text: 'Funding would allow us to upgrade our broadcast equipment and reach three new neighborhoods.',
    isSpecific: true,
  },
  {
    id: 'impact-3',
    category: 'impact',
    text: 'Support would let us install a solar demonstration kit in five schools by end of year.',
    isSpecific: true,
  },
  {
    id: 'impact-4',
    category: 'impact',
    text: 'This funding would help us grow and do more things.',
    isSpecific: false,
  },
  {
    id: 'impact-5',
    category: 'impact',
    text: 'We would use the money to improve our project.',
    isSpecific: false,
  },

  // ── How will you engage supporters? ───────────────────────────────────
  {
    id: 'engagement-1',
    category: 'engagement',
    text: 'We will share the Fund Drive with our 200-person mailing list and post weekly updates during the Drive.',
    isSpecific: true,
  },
  {
    id: 'engagement-2',
    category: 'engagement',
    text: 'We will host a live broadcast during the Fund Drive inviting our audience to participate.',
    isSpecific: true,
  },
  {
    id: 'engagement-3',
    category: 'engagement',
    text: 'We will integrate the Fund Drive into our next community gathering and explain it in person.',
    isSpecific: true,
  },
  {
    id: 'engagement-4',
    category: 'engagement',
    text: 'We will post about it on social media.',
    isSpecific: false,
  },
  {
    id: 'engagement-5',
    category: 'engagement',
    text: 'We will let our supporters know when the time is right.',
    isSpecific: false,
  },
];
