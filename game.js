export const RULES = {
  lastReviewed: '2026-08-15',
  simulated: true,
  defaultMatchMultiple: 3,
  exampleSaleAmounts: [1, 5, 10, 25, 50],
  totalSpaces: 30,
  maxPoints: 500,
  simulatedMatchAvailable: 200,
  officialLinks: {
    funds: 'https://artizen.fund/funds',
    howItWorks: 'https://artizen.fund/about',
    apply: 'https://artizen.fund/apply',
  },
  disclaimer:
    'This is an educational simulation. All Funds, balances, match amounts, eligibility requirements, and outcomes shown in this game are fictional examples. Verify current information at artizen.fund before taking any action.',
  verifyDisclaimer:
    'Check artizen.fund for current Fund balances, eligibility requirements, and Match Multiples before applying.',
};

export const PROJECTS = [
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

export const FUNDS = [
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

export const PITCH_PHRASES = [
  { id: 'what-1', category: 'what', text: 'Our project creates a recurring gathering space for community members.', isSpecific: true },
  { id: 'what-2', category: 'what', text: 'We produce community radio content centering neighborhood voices.', isSpecific: true },
  { id: 'what-3', category: 'what', text: 'We develop open-source tools for community-owned solar education.', isSpecific: true },
  { id: 'what-4', category: 'what', text: 'We do creative work that makes people feel good.', isSpecific: false },
  { id: 'what-5', category: 'what', text: 'Our project is innovative and forward-thinking.', isSpecific: false },
  { id: 'who-1', category: 'who', text: 'We serve residents of the Eastside neighborhood, many of whom have no existing third spaces nearby.', isSpecific: true },
  { id: 'who-2', category: 'who', text: 'We center local artists, musicians, and storytellers who lack access to broadcast platforms.', isSpecific: true },
  { id: 'who-3', category: 'who', text: 'We work with low-income households and youth groups exploring renewable energy access.', isSpecific: true },
  { id: 'who-4', category: 'who', text: 'We serve everyone who is interested in our work.', isSpecific: false },
  { id: 'who-5', category: 'who', text: 'Our audience is people who care about community.', isSpecific: false },
  { id: 'evidence-1', category: 'evidence', text: 'We have hosted 12 free monthly gatherings over the past year, averaging 40 attendees each.', isSpecific: true },
  { id: 'evidence-2', category: 'evidence', text: 'We have broadcast 52 episodes featuring 30 different community voices, all available for free.', isSpecific: true },
  { id: 'evidence-3', category: 'evidence', text: 'Our open-source curriculum has been downloaded by 200+ educators and is freely licensed.', isSpecific: true },
  { id: 'evidence-4', category: 'evidence', text: 'We have done events and people enjoyed them.', isSpecific: false },
  { id: 'evidence-5', category: 'evidence', text: 'Our project is well-known in our community.', isSpecific: false },
  { id: 'impact-1', category: 'impact', text: 'Match support would allow us to secure a permanent lease and expand from monthly to weekly events.', isSpecific: true },
  { id: 'impact-2', category: 'impact', text: 'Funding would allow us to upgrade our broadcast equipment and reach three new neighborhoods.', isSpecific: true },
  { id: 'impact-3', category: 'impact', text: 'Support would let us install a solar demonstration kit in five schools by end of year.', isSpecific: true },
  { id: 'impact-4', category: 'impact', text: 'This funding would help us grow and do more things.', isSpecific: false },
  { id: 'impact-5', category: 'impact', text: 'We would use the money to improve our project.', isSpecific: false },
  { id: 'engagement-1', category: 'engagement', text: 'We will share the Fund Drive with our 200-person mailing list and post weekly updates during the Drive.', isSpecific: true },
  { id: 'engagement-2', category: 'engagement', text: 'We will host a live broadcast during the Fund Drive inviting our audience to participate.', isSpecific: true },
  { id: 'engagement-3', category: 'engagement', text: 'We will integrate the Fund Drive into our next community gathering and explain it in person.', isSpecific: true },
  { id: 'engagement-4', category: 'engagement', text: 'We will post about it on social media.', isSpecific: false },
  { id: 'engagement-5', category: 'engagement', text: 'We will let our supporters know when the time is right.', isSpecific: false },
];

export const BOARD_SPACES = [
  { id: 1, type: 'path', zone: 'plant', title: 'The Seedling Patch', content: 'Every project starts as a seed. Before planting anywhere, understand what kind of seed you carry.' },
  { id: 2, type: 'garden-guide', zone: 'plant', title: 'Venus Welcomes You', content: 'Meet Venus, your garden guide. She says: "You don\'t need to plant everywhere. You need to plant where your seed can genuinely grow."', guideMessage: 'Welcome! I\'m Venus. Think of Funds as garden beds, each cultivated for a specific kind of project. Your job is to find the right soil — not cover every patch.' },
  { id: 3, type: 'reflection', zone: 'plant', title: 'What Does Your Project Do?', content: 'Take a moment to describe your project in one sentence. What does it do, and who does it serve?', reflectionKey: 'project-description' },
  { id: 4, type: 'path', zone: 'plant', title: 'Traits and Soil', content: 'Every project has natural traits — just like plants prefer certain soils. A Fund\'s eligibility requirements are the soil conditions. Match them honestly.' },
  { id: 5, type: 'decision', zone: 'plant', title: 'The Tempting Garden Bed', content: 'A Fund has exciting available match, but your project does not meet its eligibility requirements. What do you do?', options: [
    { id: 'apply-anyway', text: 'Apply anyway — the match is worth a try.', isOptimal: false, feedback: 'Applying when you\'re ineligible wastes everyone\'s time and may harm your reputation with Fund Directors. Save your energy for genuine fits.', pointsEffect: -5 },
    { id: 'skip-genuine', text: 'Skip it and look for a stronger fit.', isOptimal: true, feedback: 'Smart thinking! Skipping a poor fit protects your credibility and focuses your energy where it can actually grow.', pointsEffect: 10 },
    { id: 'rewrite', text: 'Rewrite the project description to look eligible.', isOptimal: false, feedback: 'Changing facts to appear eligible is dishonest and ultimately counterproductive. Directors notice misalignment. Be genuine.', pointsEffect: -10 },
  ] },
  { id: 6, type: 'wild-bloom', zone: 'plant', title: 'A Bee Visits!', content: 'A bee lands on your seed packet. You notice a helpful signpost nearby. Gain 5 Growth Points for being observant.' },
  { id: 7, type: 'path', zone: 'explore', title: 'The Fund Directory', content: 'Artizen Funds are maintained by Fund Directors — curators who have set eligibility criteria for projects aligned with their mission.' },
  { id: 8, type: 'soil-test', zone: 'explore', title: 'Reading the Soil', content: 'The Community Spaces Fund supports recurring physical spaces that strengthen local communities. Imagine your project hosts monthly open gatherings. Is this a strong match?', options: [
    { id: 'strong', text: 'Strong connection — this is exactly what the Fund supports.', isOptimal: true, feedback: 'Correct! Recurring physical community gatherings are a clear fit for the Community Spaces Fund.', pointsEffect: 15 },
    { id: 'possible', text: 'Possible, but unclear without more information.', isOptimal: false, feedback: 'There\'s actually strong alignment here. Monthly open gatherings in a physical space are precisely what this Fund supports.', pointsEffect: 5 },
    { id: 'weak', text: 'Weak connection — the Fund probably wants something else.', isOptimal: false, feedback: 'Not quite. Recurring physical community gatherings are a strong match for the Community Spaces Fund.', pointsEffect: 0 },
  ] },
  { id: 9, type: 'root', zone: 'explore', title: 'The Generic Pitch Root', content: 'You sent the same application to every Fund without tailoring it. Follow the root back two spaces.', rootSetback: 2 },
  { id: 10, type: 'path', zone: 'explore', title: 'Fund Directors Are Humans', content: 'Fund Directors make curation decisions. They are humans with a mission, not an algorithm. A rejection is information about fit, not a verdict on your project\'s worth.' },
  { id: 11, type: 'decision', zone: 'explore', title: 'The Director\'s Question', content: 'A Fund Director asks: "Can you give me a concrete example of how your project serves this community?" What do you do?', options: [
    { id: 'vague', text: 'Say the project is for everyone and serves all communities.', isOptimal: false, feedback: 'Vague answers don\'t help Directors evaluate fit. They need specific, real examples.', pointsEffect: 0 },
    { id: 'specific', text: 'Share a specific recurring event, number of participants, or community outcome.', isOptimal: true, feedback: 'Excellent! Specific evidence is what Directors need to make confident curation decisions.', pointsEffect: 15 },
    { id: 'ignore', text: 'Ignore the question and resubmit the original pitch.', isOptimal: false, feedback: 'Ignoring clarification requests signals disengagement. Directors want to know you\'re a thoughtful collaborator.', pointsEffect: -5 },
  ] },
  { id: 12, type: 'trellis', zone: 'explore', title: 'The Trellis of Specificity', content: 'You connected a specific project example to a Fund\'s mission. Climb the trellis three spaces!', trellisAdvance: 3 },
  { id: 13, type: 'path', zone: 'cultivate', title: 'The Cultivation Table', content: 'Evaluating fit means honestly comparing your project\'s traits against a Fund\'s requirements. Strong fit means genuine alignment — not wishful thinking.' },
  { id: 14, type: 'soil-test', zone: 'cultivate', title: 'Exclusion Zones', content: 'The Climate Technology Fund excludes extractive-resource projects. A project selling fossil fuel data would be excluded. What about a project teaching solar energy to youth?', options: [
    { id: 'excluded', text: 'It would probably be excluded — anything energy-related is risky.', isOptimal: false, feedback: 'Not quite. Teaching solar energy is aligned with the Fund\'s mission. Exclusions target harmful practices, not the topic itself.', pointsEffect: 0 },
    { id: 'strong-fit', text: 'It\'s a strong fit — the Fund supports climate education.', isOptimal: true, feedback: 'Exactly right! Climate education for youth is a clear fit. Exclusions exist to block misalignment, not to exclude related topics.', pointsEffect: 15 },
  ] },
  { id: 15, type: 'reflection', zone: 'cultivate', title: 'Which Fund Feels Right?', content: 'Looking at the Funds you\'ve learned about, which one feels like the most genuine fit for a project like yours? What is the clearest connection?', reflectionKey: 'best-fund-fit' },
  { id: 16, type: 'decision', zone: 'cultivate', title: 'The Application Moment', content: 'You\'re assembling a pitch for a Fund. You notice one eligibility requirement that your project doesn\'t quite meet. What do you do?', options: [
    { id: 'omit', text: 'Leave out that requirement entirely and hope no one notices.', isOptimal: false, feedback: 'Omitting relevant information is misleading. Directors will likely notice gaps and this can disqualify you.', pointsEffect: -5 },
    { id: 'acknowledge', text: 'Acknowledge the gap and explain what you\'re doing to address it.', isOptimal: true, feedback: 'This shows integrity and self-awareness. Directors appreciate honesty about where a project is in its development.', pointsEffect: 20 },
    { id: 'withdraw', text: 'Withdraw this application and find a better-fitting Fund.', isOptimal: false, feedback: 'This is sometimes the right call — but before withdrawing, consider whether you can honestly address the gap. Context matters.', pointsEffect: 5 },
  ] },
  { id: 17, type: 'garden-guide', zone: 'cultivate', title: 'Venus on Tailoring', content: 'Venus appears with a watering can. She says: "Tailoring means using true facts in the order most relevant to this particular garden bed. It doesn\'t mean inventing traits you don\'t have."', guideMessage: 'Good pitches are specific, honest, and connect real evidence to the Fund\'s real mission. Each application should feel written for that Fund — because it was.' },
  { id: 18, type: 'trellis', zone: 'cultivate', title: 'The Honest Trellis', content: 'You tailored your pitch with real, specific evidence. Advance two spaces for genuine preparation.', trellisAdvance: 2 },
  { id: 19, type: 'path', zone: 'curate', title: 'The Curation Gate', content: 'Being curated means a Fund Director has reviewed your application and decided your project belongs in their garden bed. Curation opens the door to available match.' },
  { id: 20, type: 'decision', zone: 'curate', title: 'Clarification Requested', content: 'A Fund Director sends a clarification request: they see potential but need more evidence. What do you do?', options: [
    { id: 'ignore', text: 'Ignore it — the application should speak for itself.', isOptimal: false, feedback: 'Ignoring a Director\'s request signals disengagement. Respond promptly with specific new information.', pointsEffect: -10 },
    { id: 'respond-specific', text: 'Respond with a specific new example that directly addresses the question.', isOptimal: true, feedback: 'Well done! Responding with targeted, specific information gives the Director what they need to feel confident in their decision.', pointsEffect: 20 },
    { id: 'repeat', text: 'Resend the same application with a different subject line.', isOptimal: false, feedback: 'Repeating the same information doesn\'t address the Director\'s specific question.', pointsEffect: 0 },
  ] },
  { id: 21, type: 'path', zone: 'curate', title: 'Not Every Rejection Is Your Fault', content: 'Curation is a human decision. A pass may reflect timing, Fund priorities, or available capacity — not a judgment on your project\'s quality.' },
  { id: 22, type: 'root', zone: 'curate', title: 'The Panic Replant Root', content: 'You applied to six Funds at once without evaluating fit and overwhelmed yourself. Follow the root back one space and breathe.', rootSetback: 1 },
  { id: 23, type: 'wild-bloom', zone: 'curate', title: 'Sunflower Surprise!', content: 'A sunflower blooms at the edge of the path. You receive 10 bonus Growth Points and a preview: the Fund Drive is coming!' },
  { id: 24, type: 'reflection', zone: 'curate', title: 'What Would You Do with Curation?', content: 'If a Fund curated your project today, how would you tell your community? What would you say to invite supporters?', reflectionKey: 'curation-communication' },
  { id: 25, type: 'path', zone: 'bloom', title: 'The Fund Drive Greenhouse', content: 'A Fund Drive is a time-limited period when supporters can purchase Artifacts and help unlock available match for curated projects. Creator engagement matters.' },
  { id: 26, type: 'decision', zone: 'bloom', title: 'The Supporter Invitation', content: 'Your project is curated and a Fund Drive is active. How do you engage your community?', options: [
    { id: 'pressure', text: 'Tell supporters they must buy or the project fails.', isOptimal: false, feedback: 'Pressure tactics damage relationships. Supporters engage more when they feel invited, not obligated.', pointsEffect: -5 },
    { id: 'clear-invite', text: 'Share clearly what the Fund Drive is, what match means, and invite supporters to participate if it feels right.', isOptimal: true, feedback: 'Excellent! Clear, honest communication builds trust. Supporters who understand the opportunity are more likely to engage.', pointsEffect: 20 },
    { id: 'nothing', text: 'Do nothing and hope supporters find it on their own.', isOptimal: false, feedback: 'Passive waiting rarely works. Steady, honest outreach increases the chance of unlocking available match.', pointsEffect: 0 },
  ] },
  { id: 27, type: 'path', zone: 'bloom', title: 'Match Is Not Automatic', content: 'Available match is held in a Fund. It is not automatically transferred. Creator activity, supporter purchases, and Fund Drive timing all affect how much match is unlocked.' },
  { id: 28, type: 'soil-test', zone: 'bloom', title: 'Calculate the Bloom', content: 'A supporter buys a $10 Artifact. The Match Multiple is 3x. How much total is raised for the project?', options: [
    { id: 'ten', text: '$10 — just the sale amount.', isOptimal: false, feedback: 'The $10 sale is only part of the total. The match multiplies supporter purchases.', pointsEffect: 0 },
    { id: 'thirty', text: '$30 — only the match portion.', isOptimal: false, feedback: 'Close! The match is $30 ($10 × 3), but the total raised includes both the sale and the match.', pointsEffect: 5 },
    { id: 'forty', text: '$40 — the $10 sale plus $30 in unlocked match.', isOptimal: true, feedback: 'Correct! Total raised = sale + match = $10 + $30 = $40. (All amounts are simulated examples.)', pointsEffect: 30 },
  ] },
  { id: 29, type: 'garden-guide', zone: 'bloom', title: 'Venus on Blooming', content: 'Venus says: "Blooming doesn\'t mean your project is finished — it means the community has seen your roots and decided to help you grow. That\'s the beginning, not the end."', guideMessage: 'Remember: match numbers in this game are examples. Always check artizen.fund for current rules, balances, and timelines before making decisions.' },
  { id: 30, type: 'reflection', zone: 'bloom', title: 'The Harvest Table', content: 'You\'ve reached the harvest table! Before receiving your Garden Plan, reflect: what is the most important thing you\'ve learned about finding the right Fund for your project?', reflectionKey: 'key-learning' },
];

const BOARD_COLUMNS = 5;

export function getBoardPlacement(spaceId) {
  if (spaceId < 1 || spaceId > RULES.totalSpaces) {
    throw new RangeError(`spaceId must be between 1 and ${RULES.totalSpaces}`);
  }
  const index = spaceId - 1;
  const row = Math.floor(index / BOARD_COLUMNS);
  const columnInRow = index % BOARD_COLUMNS;
  const column = row % 2 === 0 ? columnInRow : BOARD_COLUMNS - 1 - columnInRow;
  const drift = Math.round(((column - 2) * 0.45 + (row % 2 === 0 ? -0.2 : 0.2)) * 100) / 100;
  const tilt = (row % 2 === 0 ? columnInRow - 2 : 2 - columnInRow) * 2.5;
  return {
    column,
    row,
    drift,
    tilt: `${tilt}deg`,
  };
}

export const SCORE = {
  IDENTIFY_STRONG_FIT: 20,
  SKIP_UNSUITABLE_FUND: 10,
  CONNECT_EVIDENCE: 15,
  CREATE_TAILORED_PITCH: 25,
  COMPLETE_SUBMISSION: 10,
  RESPOND_TO_CLARIFICATION: 20,
  RECEIVE_SIMULATED_APPROVAL: 50,
  CALCULATE_MATCH_CORRECTLY: 30,
  UNLOCK_ALL_MATCH: 200,
  COMPLETE_GARDEN_PLAN: 50,
};

export function createSeededRng(seed) {
  let s = seed >>> 0;
  return function next() {
    s += 0x6d2b79f5;
    let z = s;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

export function randInt(rng, min, max) {
  return min + Math.floor(rng() * (max - min + 1));
}

export function rollD6(rng) {
  return randInt(rng, 1, 6);
}

export function scorePitch(phraseIds, allPhrases) {
  const categories = new Set();
  let specificCount = 0;

  for (const id of phraseIds) {
    const phrase = allPhrases.find((p) => p.id === id);
    if (!phrase) continue;
    categories.add(phrase.category);
    if (phrase.isSpecific) specificCount++;
  }

  const categoryScore = (categories.size / 5) * 50;
  const specificityScore = (specificCount / Math.max(phraseIds.length, 1)) * 50;
  const total = Math.round(categoryScore + specificityScore);

  let feedback;
  if (total >= 80) {
    feedback =
      'Your pitch is specific, well-rounded, and clearly connected to this garden bed. A Director can see exactly why your project belongs here.';
  } else if (total >= 50) {
    feedback =
      'This tells the Director that your work matters, but not fully why it belongs in this particular garden bed. Add evidence connecting your project to the Fund\'s mission.';
  } else {
    feedback =
      'This pitch is missing key elements. Make sure you\'ve addressed what the project does, who it serves, evidence of fit, potential impact, and how you\'ll engage supporters.';
  }

  return { score: total, feedback };
}

export function calculateMatchUnlocked(saleAmount, matchMultiple, matchAvailable) {
  const potentialMatch = saleAmount * matchMultiple;
  const matchUnlocked = Math.min(potentialMatch, matchAvailable);
  const totalRaised = saleAmount + matchUnlocked;
  const matchRemaining = matchAvailable - matchUnlocked;
  return { matchUnlocked, totalRaised, matchRemaining };
}

export function calculateFit(project, fund) {
  const projectTraits = new Set(project.traits);
  const excluded = fund.excludedTraits.filter((t) => projectTraits.has(t));
  if (excluded.length > 0) {
    return {
      fundId: fund.id,
      level: 'ineligible',
      explanation: `This garden bed isn't the right soil for ${project.name}. One or more of your project's traits (${excluded.join(', ')}) conflicts with this Fund's exclusion criteria.`,
      matchingTraits: [],
      missingTraits: fund.preferredTraits.filter((t) => !projectTraits.has(t)),
    };
  }

  const matchingTraits = fund.preferredTraits.filter((t) => projectTraits.has(t));
  const missingTraits = fund.preferredTraits.filter((t) => !projectTraits.has(t));

  let level;
  let explanation;
  if (matchingTraits.length >= 3) {
    level = 'strong';
    explanation = `${project.name} shows strong alignment with ${fund.name}. Your project shares ${matchingTraits.length} of this Fund's preferred traits, and no exclusions apply.`;
  } else if (matchingTraits.length >= 1) {
    level = 'possible';
    explanation = `${project.name} may fit ${fund.name}, but the connection isn't fully clear. You share ${matchingTraits.length} preferred trait(s). Consider whether you can provide stronger evidence of alignment.`;
  } else {
    level = 'weak';
    explanation = `${project.name} doesn't share many traits with ${fund.name}. This may not be the right garden bed for this seed.`;
  }

  return { fundId: fund.id, level, explanation, matchingTraits, missingTraits };
}

export function calculateAllFits(project, funds) {
  return funds.map((fund) => calculateFit(project, fund));
}

export function simulateCuration(fund, pitch, seed) {
  const salt = [...fund.id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rng = createSeededRng(seed + salt);
  const random = rng();
  const score = pitch.score;

  let outcome;
  if (score >= 75 && random < 0.7) {
    outcome = 'curated';
  } else if (score >= 75 && random < 0.9) {
    outcome = 'needs-clarification';
  } else if (score >= 50 && random < 0.6) {
    outcome = 'needs-clarification';
  } else if (score >= 50 && random < 0.85) {
    outcome = 'eligible-not-selected';
  } else if (score >= 30) {
    outcome = 'eligible-not-selected';
  } else {
    outcome = 'not-eligible';
  }

  const explanations = {
    curated:
      'Curated! Your project demonstrated a clear connection to this Fund\'s mission. The Director has added your project to this garden bed.',
    'needs-clarification':
      'Needs clarification. The Director can see potential alignment but needs a concrete example of how your project serves the stated community.',
    'eligible-not-selected':
      'Eligible, but not selected. Your application was credible, but curation is still a human decision. This is not a verdict on the quality of your work.',
    'not-eligible':
      'Not currently eligible. Your project may be healthy, but this garden bed requires different soil. Consider whether a different Fund is a stronger fit.',
  };

  return {
    fundId: fund.id,
    outcome,
    explanation: explanations[outcome],
  };
}

export function createInitialState(seedValue = Date.now()) {
  return {
    phase: 'welcome',
    selectedProjectId: null,
    currentSpace: 0,
    totalSpaces: RULES.totalSpaces,
    growthPoints: 0,
    isMoving: false,
    lastRoll: null,
    completedSpaces: [],
    currentEncounter: null,
    encounterResolved: true,
    fitResults: [],
    selectedFundIds: [],
    skippedFundIds: [],
    pitches: [],
    curationResults: [],
    fundDriveResults: [],
    reflections: {},
    reducedMotion: false,
    soundEnabled: false,
    artizenAccountLinked: false,
    seedValue,
    savedAt: null,
  };
}

function getSpace(position) {
  return BOARD_SPACES.find((s) => s.id === position) ?? null;
}

function clampPosition(pos) {
  return Math.max(0, Math.min(RULES.totalSpaces, pos));
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, phase: 'choose-project' };
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProjectId: action.projectId,
        phase: 'playing',
        currentSpace: 0,
        completedSpaces: [],
        growthPoints: 0,
        currentEncounter: null,
        encounterResolved: true,
        isMoving: false,
        lastRoll: null,
      };
    case 'ROLL_DIE':
      return {
        ...state,
        lastRoll: action.value,
        isMoving: true,
        encounterResolved: true,
      };
    case 'ADVANCE_TOKEN': {
      if (!state.isMoving || state.lastRoll === null) return state;
      const newPos = clampPosition(state.currentSpace + 1);
      const completedSpaces = state.completedSpaces.includes(newPos)
        ? state.completedSpaces
        : [...state.completedSpaces, newPos];
      const remaining = state.lastRoll - 1;
      if (newPos >= RULES.totalSpaces) {
        return {
          ...state,
          currentSpace: newPos,
          completedSpaces,
          isMoving: false,
          lastRoll: null,
          phase: 'select-funds',
        };
      }
      if (remaining <= 0) {
        const space = getSpace(newPos);
        return {
          ...state,
          currentSpace: newPos,
          completedSpaces,
          isMoving: false,
          lastRoll: null,
          currentEncounter: space,
          encounterResolved: space === null,
        };
      }
      return {
        ...state,
        currentSpace: newPos,
        completedSpaces,
        lastRoll: remaining,
      };
    }
    case 'LAND_ON_SPACE': {
      const space = action.space;
      let nextPos = state.currentSpace;
      if (space.type === 'trellis' && space.trellisAdvance) {
        nextPos = clampPosition(state.currentSpace + space.trellisAdvance);
      } else if (space.type === 'root' && space.rootSetback) {
        nextPos = clampPosition(state.currentSpace - space.rootSetback);
      }
      const completedSpaces = state.completedSpaces.includes(nextPos)
        ? state.completedSpaces
        : [...state.completedSpaces, nextPos];
      return {
        ...state,
        currentSpace: nextPos,
        currentEncounter: space,
        encounterResolved: false,
        completedSpaces,
      };
    }
    case 'RESOLVE_ENCOUNTER': {
      if (!state.currentEncounter) return { ...state, encounterResolved: true };
      let pointsGain = 0;
      let nextPos = state.currentSpace;
      const space = state.currentEncounter;

      if (space.type === 'trellis' && space.trellisAdvance) {
        nextPos = clampPosition(state.currentSpace + space.trellisAdvance);
      } else if (space.type === 'root' && space.rootSetback) {
        nextPos = clampPosition(state.currentSpace - space.rootSetback);
      }

      if (action.optionId && space.options) {
        const option = space.options.find((o) => o.id === action.optionId);
        if (option) pointsGain = Math.max(0, option.pointsEffect);
      }

      if (space.type === 'wild-bloom') {
        pointsGain += 5;
      }

      const reflections = { ...state.reflections };
      if (space.reflectionKey && action.reflection) {
        reflections[space.reflectionKey] = action.reflection;
      }

      const completedSpaces = state.completedSpaces.includes(nextPos)
        ? state.completedSpaces
        : [...state.completedSpaces, nextPos];

      return {
        ...state,
        currentSpace: nextPos,
        encounterResolved: true,
        currentEncounter: null,
        growthPoints: state.growthPoints + pointsGain,
        reflections,
        completedSpaces,
      };
    }
    case 'ADD_POINTS':
      return { ...state, growthPoints: state.growthPoints + action.points };
    case 'GO_TO_SELECT_FUNDS':
      return { ...state, phase: 'select-funds' };
    case 'SELECT_FUND':
      if (state.selectedFundIds.includes(action.fundId)) return state;
      return { ...state, selectedFundIds: [...state.selectedFundIds, action.fundId] };
    case 'SKIP_FUND':
      if (state.skippedFundIds.includes(action.fundId)) return state;
      return {
        ...state,
        skippedFundIds: [...state.skippedFundIds, action.fundId],
        growthPoints: state.growthPoints + 10,
      };
    case 'ADD_FIT_RESULT': {
      const existing = state.fitResults.findIndex((r) => r.fundId === action.result.fundId);
      const fitResults = existing >= 0 ? state.fitResults.map((r, i) => (i === existing ? action.result : r)) : [...state.fitResults, action.result];
      return { ...state, fitResults };
    }
    case 'GO_TO_BUILD_PITCH':
      return { ...state, phase: 'build-pitch' };
    case 'SUBMIT_PITCH': {
      const existing = state.pitches.findIndex((p) => p.fundId === action.pitch.fundId);
      const pitches = existing >= 0 ? state.pitches.map((p, i) => (i === existing ? action.pitch : p)) : [...state.pitches, action.pitch];
      return { ...state, pitches, growthPoints: state.growthPoints + 10 };
    }
    case 'GO_TO_CURATION':
      return { ...state, phase: 'curation' };
    case 'ADD_CURATION_RESULT': {
      const existing = state.curationResults.findIndex((r) => r.fundId === action.result.fundId);
      const curationResults = existing >= 0 ? state.curationResults.map((r, i) => (i === existing ? action.result : r)) : [...state.curationResults, action.result];
      let bonus = 0;
      if (action.result.outcome === 'curated') bonus = 50;
      else if (action.result.outcome === 'needs-clarification') bonus = 10;
      return { ...state, curationResults, growthPoints: state.growthPoints + bonus };
    }
    case 'GO_TO_FUND_DRIVE':
      return { ...state, phase: 'fund-drive' };
    case 'ADD_FUND_DRIVE_RESULT': {
      const existing = state.fundDriveResults.findIndex((r) => r.fundId === action.result.fundId);
      const fundDriveResults = existing >= 0 ? state.fundDriveResults.map((r, i) => (i === existing ? action.result : r)) : [...state.fundDriveResults, action.result];
      const allUnlocked = action.result.matchRemaining === 0;
      return { ...state, fundDriveResults, growthPoints: state.growthPoints + (allUnlocked ? 200 : 0) };
    }
    case 'GO_TO_GARDEN_PLAN':
      return { ...state, phase: 'garden-plan', growthPoints: state.growthPoints + 50 };
    case 'COMPLETE_GAME':
      return { ...state, phase: 'complete' };
    case 'TOGGLE_REDUCED_MOTION':
      return { ...state, reducedMotion: !state.reducedMotion };
    case 'TOGGLE_ARTIZEN_ACCOUNT':
      return { ...state, artizenAccountLinked: !state.artizenAccountLinked };
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'RESET_GAME':
      return createInitialState(Date.now());
    case 'RESTORE_STATE':
      return action.state;
    default:
      return state;
  }
}
