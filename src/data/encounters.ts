import type { BoardSpace } from '../game/types';

/**
 * The 30 board spaces of The Match Garden.
 * Spaces are 0-indexed; space 0 is the starting position (not a real space).
 * Spaces 1-30 are the path.
 */
export const BOARD_SPACES: BoardSpace[] = [
  // ── Zone 1: Plant (spaces 1–6) ──────────────────────────────────────────
  {
    id: 1,
    type: 'path',
    zone: 'plant',
    title: 'The Seedling Patch',
    content:
      'Every project starts as a seed. Before planting anywhere, understand what kind of seed you carry.',
  },
  {
    id: 2,
    type: 'garden-guide',
    zone: 'plant',
    title: 'Venus Welcomes You',
    content:
      'Meet Venus, your garden guide. She says: "You don\'t need to plant everywhere. You need to plant where your seed can genuinely grow."',
    guideMessage:
      'Welcome! I\'m Venus. Think of Funds as garden beds, each cultivated for a specific kind of project. Your job is to find the right soil — not cover every patch.',
  },
  {
    id: 3,
    type: 'reflection',
    zone: 'plant',
    title: 'What Does Your Project Do?',
    content:
      'Take a moment to describe your project in one sentence. What does it do, and who does it serve?',
    reflectionKey: 'project-description',
  },
  {
    id: 4,
    type: 'path',
    zone: 'plant',
    title: 'Traits and Soil',
    content:
      'Every project has natural traits — just like plants prefer certain soils. A Fund\'s eligibility requirements are the soil conditions. Match them honestly.',
  },
  {
    id: 5,
    type: 'decision',
    zone: 'plant',
    title: 'The Tempting Garden Bed',
    content:
      'A Fund has exciting available match, but your project does not meet its eligibility requirements. What do you do?',
    options: [
      {
        id: 'apply-anyway',
        text: 'Apply anyway — the match is worth a try.',
        isOptimal: false,
        feedback:
          'Applying when you\'re ineligible wastes everyone\'s time and may harm your reputation with Fund Directors. Save your energy for genuine fits.',
        pointsEffect: -5,
      },
      {
        id: 'skip-genuine',
        text: 'Skip it and look for a stronger fit.',
        isOptimal: true,
        feedback:
          'Smart thinking! Skipping a poor fit protects your credibility and focuses your energy where it can actually grow.',
        pointsEffect: 10,
      },
      {
        id: 'rewrite',
        text: 'Rewrite the project description to look eligible.',
        isOptimal: false,
        feedback:
          'Changing facts to appear eligible is dishonest and ultimately counterproductive. Directors notice misalignment. Be genuine.',
        pointsEffect: -10,
      },
    ],
  },
  {
    id: 6,
    type: 'wild-bloom',
    zone: 'plant',
    title: 'A Bee Visits!',
    content:
      'A bee lands on your seed packet. You notice a helpful signpost nearby. Gain 5 Growth Points for being observant.',
  },

  // ── Zone 2: Explore (spaces 7–12) ───────────────────────────────────────
  {
    id: 7,
    type: 'path',
    zone: 'explore',
    title: 'The Fund Directory',
    content:
      'Artizen Funds are maintained by Fund Directors — curators who have set eligibility criteria for projects aligned with their mission.',
  },
  {
    id: 8,
    type: 'soil-test',
    zone: 'explore',
    title: 'Reading the Soil',
    content:
      'The Community Spaces Fund supports recurring physical spaces that strengthen local communities. Imagine your project hosts monthly open gatherings. Is this a strong match?',
    options: [
      {
        id: 'strong',
        text: 'Strong connection — this is exactly what the Fund supports.',
        isOptimal: true,
        feedback:
          'Correct! Recurring physical community gatherings are a clear fit for the Community Spaces Fund.',
        pointsEffect: 15,
      },
      {
        id: 'possible',
        text: 'Possible, but unclear without more information.',
        isOptimal: false,
        feedback:
          'There\'s actually strong alignment here. Monthly open gatherings in a physical space are precisely what this Fund supports.',
        pointsEffect: 5,
      },
      {
        id: 'weak',
        text: 'Weak connection — the Fund probably wants something else.',
        isOptimal: false,
        feedback:
          'Not quite. Recurring physical community gatherings are a strong match for the Community Spaces Fund.',
        pointsEffect: 0,
      },
    ],
  },
  {
    id: 9,
    type: 'root',
    zone: 'explore',
    title: 'The Generic Pitch Root',
    content:
      'You sent the same application to every Fund without tailoring it. Follow the root back two spaces.',
    rootSetback: 2,
  },
  {
    id: 10,
    type: 'path',
    zone: 'explore',
    title: 'Fund Directors Are Humans',
    content:
      'Fund Directors make curation decisions. They are humans with a mission, not an algorithm. A rejection is information about fit, not a verdict on your project\'s worth.',
  },
  {
    id: 11,
    type: 'decision',
    zone: 'explore',
    title: 'The Director\'s Question',
    content:
      'A Fund Director asks: "Can you give me a concrete example of how your project serves this community?" What do you do?',
    options: [
      {
        id: 'vague',
        text: 'Say the project is for everyone and serves all communities.',
        isOptimal: false,
        feedback:
          'Vague answers don\'t help Directors evaluate fit. They need specific, real examples.',
        pointsEffect: 0,
      },
      {
        id: 'specific',
        text: 'Share a specific recurring event, number of participants, or community outcome.',
        isOptimal: true,
        feedback:
          'Excellent! Specific evidence is what Directors need to make confident curation decisions.',
        pointsEffect: 15,
      },
      {
        id: 'ignore',
        text: 'Ignore the question and resubmit the original pitch.',
        isOptimal: false,
        feedback:
          'Ignoring clarification requests signals disengagement. Directors want to know you\'re a thoughtful collaborator.',
        pointsEffect: -5,
      },
    ],
  },
  {
    id: 12,
    type: 'trellis',
    zone: 'explore',
    title: 'The Trellis of Specificity',
    content:
      'You connected a specific project example to a Fund\'s mission. Climb the trellis three spaces!',
    trellisAdvance: 3,
  },

  // ── Zone 3: Cultivate (spaces 13–18) ─────────────────────────────────────
  {
    id: 13,
    type: 'path',
    zone: 'cultivate',
    title: 'The Cultivation Table',
    content:
      'Evaluating fit means honestly comparing your project\'s traits against a Fund\'s requirements. Strong fit means genuine alignment — not wishful thinking.',
  },
  {
    id: 14,
    type: 'soil-test',
    zone: 'cultivate',
    title: 'Exclusion Zones',
    content:
      'The Climate Technology Fund excludes extractive-resource projects. A project selling fossil fuel data would be excluded. What about a project teaching solar energy to youth?',
    options: [
      {
        id: 'excluded',
        text: 'It would probably be excluded — anything energy-related is risky.',
        isOptimal: false,
        feedback:
          'Not quite. Teaching solar energy is aligned with the Fund\'s mission. Exclusions target harmful practices, not the topic itself.',
        pointsEffect: 0,
      },
      {
        id: 'strong-fit',
        text: 'It\'s a strong fit — the Fund supports climate education.',
        isOptimal: true,
        feedback:
          'Exactly right! Climate education for youth is a clear fit. Exclusions exist to block misalignment, not to exclude related topics.',
        pointsEffect: 15,
      },
    ],
  },
  {
    id: 15,
    type: 'reflection',
    zone: 'cultivate',
    title: 'Which Fund Feels Right?',
    content:
      'Looking at the Funds you\'ve learned about, which one feels like the most genuine fit for a project like yours? What is the clearest connection?',
    reflectionKey: 'best-fund-fit',
  },
  {
    id: 16,
    type: 'decision',
    zone: 'cultivate',
    title: 'The Application Moment',
    content:
      'You\'re assembling a pitch for a Fund. You notice one eligibility requirement that your project doesn\'t quite meet. What do you do?',
    options: [
      {
        id: 'omit',
        text: 'Leave out that requirement entirely and hope no one notices.',
        isOptimal: false,
        feedback:
          'Omitting relevant information is misleading. Directors will likely notice gaps and this can disqualify you.',
        pointsEffect: -5,
      },
      {
        id: 'acknowledge',
        text: 'Acknowledge the gap and explain what you\'re doing to address it.',
        isOptimal: true,
        feedback:
          'This shows integrity and self-awareness. Directors appreciate honesty about where a project is in its development.',
        pointsEffect: 20,
      },
      {
        id: 'withdraw',
        text: 'Withdraw this application and find a better-fitting Fund.',
        isOptimal: false,
        feedback:
          'This is sometimes the right call — but before withdrawing, consider whether you can honestly address the gap. Context matters.',
        pointsEffect: 5,
      },
    ],
  },
  {
    id: 17,
    type: 'garden-guide',
    zone: 'cultivate',
    title: 'Venus on Tailoring',
    content:
      'Venus appears with a watering can. She says: "Tailoring means using true facts in the order most relevant to this particular garden bed. It doesn\'t mean inventing traits you don\'t have."',
    guideMessage:
      'Good pitches are specific, honest, and connect real evidence to the Fund\'s real mission. Each application should feel written for that Fund — because it was.',
  },
  {
    id: 18,
    type: 'trellis',
    zone: 'cultivate',
    title: 'The Honest Trellis',
    content:
      'You tailored your pitch with real, specific evidence. Advance two spaces for genuine preparation.',
    trellisAdvance: 2,
  },

  // ── Zone 4: Curate (spaces 19–24) ────────────────────────────────────────
  {
    id: 19,
    type: 'path',
    zone: 'curate',
    title: 'The Curation Gate',
    content:
      'Being curated means a Fund Director has reviewed your application and decided your project belongs in their garden bed. Curation opens the door to available match.',
  },
  {
    id: 20,
    type: 'decision',
    zone: 'curate',
    title: 'Clarification Requested',
    content:
      'A Fund Director sends a clarification request: they see potential but need more evidence. What do you do?',
    options: [
      {
        id: 'ignore',
        text: 'Ignore it — the application should speak for itself.',
        isOptimal: false,
        feedback:
          'Ignoring a Director\'s request signals disengagement. Respond promptly with specific new information.',
        pointsEffect: -10,
      },
      {
        id: 'respond-specific',
        text: 'Respond with a specific new example that directly addresses the question.',
        isOptimal: true,
        feedback:
          'Well done! Responding with targeted, specific information gives the Director what they need to feel confident in their decision.',
        pointsEffect: 20,
      },
      {
        id: 'repeat',
        text: 'Resend the same application with a different subject line.',
        isOptimal: false,
        feedback:
          'Repeating the same information doesn\'t address the Director\'s specific question.',
        pointsEffect: 0,
      },
    ],
  },
  {
    id: 21,
    type: 'path',
    zone: 'curate',
    title: 'Not Every Rejection Is Your Fault',
    content:
      'Curation is a human decision. A pass may reflect timing, Fund priorities, or available capacity — not a judgment on your project\'s quality.',
  },
  {
    id: 22,
    type: 'root',
    zone: 'curate',
    title: 'The Panic Replant Root',
    content:
      'You applied to six Funds at once without evaluating fit and overwhelmed yourself. Follow the root back one space and breathe.',
    rootSetback: 1,
  },
  {
    id: 23,
    type: 'wild-bloom',
    zone: 'curate',
    title: 'Sunflower Surprise!',
    content:
      'A sunflower blooms at the edge of the path. You receive 10 bonus Growth Points and a preview: the Fund Drive is coming!',
  },
  {
    id: 24,
    type: 'reflection',
    zone: 'curate',
    title: 'What Would You Do with Curation?',
    content:
      'If a Fund curated your project today, how would you tell your community? What would you say to invite supporters?',
    reflectionKey: 'curation-communication',
  },

  // ── Zone 5: Bloom (spaces 25–30) ─────────────────────────────────────────
  {
    id: 25,
    type: 'path',
    zone: 'bloom',
    title: 'The Fund Drive Greenhouse',
    content:
      'A Fund Drive is a time-limited period when supporters can purchase Artifacts and help unlock available match for curated projects. Creator engagement matters.',
  },
  {
    id: 26,
    type: 'decision',
    zone: 'bloom',
    title: 'The Supporter Invitation',
    content:
      'Your project is curated and a Fund Drive is active. How do you engage your community?',
    options: [
      {
        id: 'pressure',
        text: 'Tell supporters they must buy or the project fails.',
        isOptimal: false,
        feedback:
          'Pressure tactics damage relationships. Supporters engage more when they feel invited, not obligated.',
        pointsEffect: -5,
      },
      {
        id: 'clear-invite',
        text: 'Share clearly what the Fund Drive is, what match means, and invite supporters to participate if it feels right.',
        isOptimal: true,
        feedback:
          'Excellent! Clear, honest communication builds trust. Supporters who understand the opportunity are more likely to engage.',
        pointsEffect: 20,
      },
      {
        id: 'nothing',
        text: 'Do nothing and hope supporters find it on their own.',
        isOptimal: false,
        feedback:
          'Passive waiting rarely works. Steady, honest outreach increases the chance of unlocking available match.',
        pointsEffect: 0,
      },
    ],
  },
  {
    id: 27,
    type: 'path',
    zone: 'bloom',
    title: 'Match Is Not Automatic',
    content:
      'Available match is held in a Fund. It is not automatically transferred. Creator activity, supporter purchases, and Fund Drive timing all affect how much match is unlocked.',
  },
  {
    id: 28,
    type: 'soil-test',
    zone: 'bloom',
    title: 'Calculate the Bloom',
    content:
      'A supporter buys a $10 Artifact. The Match Multiple is 3x. How much total is raised for the project?',
    options: [
      {
        id: 'ten',
        text: '$10 — just the sale amount.',
        isOptimal: false,
        feedback:
          'The $10 sale is only part of the total. The match multiplies supporter purchases.',
        pointsEffect: 0,
      },
      {
        id: 'thirty',
        text: '$30 — only the match portion.',
        isOptimal: false,
        feedback:
          'Close! The match is $30 ($10 × 3), but the total raised includes both the sale and the match.',
        pointsEffect: 5,
      },
      {
        id: 'forty',
        text: '$40 — the $10 sale plus $30 in unlocked match.',
        isOptimal: true,
        feedback:
          'Correct! Total raised = sale + match = $10 + $30 = $40. (All amounts are simulated examples.)',
        pointsEffect: 30,
      },
    ],
  },
  {
    id: 29,
    type: 'garden-guide',
    zone: 'bloom',
    title: 'Venus on Blooming',
    content:
      'Venus says: "Blooming doesn\'t mean your project is finished — it means the community has seen your roots and decided to help you grow. That\'s the beginning, not the end."',
    guideMessage:
      'Remember: match numbers in this game are examples. Always check artizen.fund for current rules, balances, and timelines before making decisions.',
  },
  {
    id: 30,
    type: 'reflection',
    zone: 'bloom',
    title: 'The Harvest Table',
    content:
      'You\'ve reached the harvest table! Before receiving your Garden Plan, reflect: what is the most important thing you\'ve learned about finding the right Fund for your project?',
    reflectionKey: 'key-learning',
  },
];
