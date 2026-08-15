/**
 * Scoring constants for Growth Points.
 * All values can be adjusted here.
 */
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
} as const;

/** Calculate pitch quality score (0–100) based on phrase specificity. */
export function scorePitch(
  phraseIds: string[],
  allPhrases: Array<{ id: string; isSpecific: boolean; category: string }>
): { score: number; feedback: string } {
  const categories = new Set<string>();
  let specificCount = 0;

  for (const id of phraseIds) {
    const phrase = allPhrases.find((p) => p.id === id);
    if (!phrase) continue;
    categories.add(phrase.category);
    if (phrase.isSpecific) specificCount++;
  }

  const categoryScore = (categories.size / 5) * 50; // 5 categories max
  const specificityScore = (specificCount / Math.max(phraseIds.length, 1)) * 50;
  const total = Math.round(categoryScore + specificityScore);

  let feedback: string;
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

/**
 * Calculate match unlocked by an Artifact sale.
 * @param saleAmount - Dollar amount of the Artifact purchase (simulated)
 * @param matchMultiple - Match multiple (e.g. 3 means 3x)
 * @param matchAvailable - Remaining match available in the Fund (simulated)
 */
export function calculateMatchUnlocked(
  saleAmount: number,
  matchMultiple: number,
  matchAvailable: number
): {
  matchUnlocked: number;
  totalRaised: number;
  matchRemaining: number;
} {
  const potentialMatch = saleAmount * matchMultiple;
  const matchUnlocked = Math.min(potentialMatch, matchAvailable);
  const totalRaised = saleAmount + matchUnlocked;
  const matchRemaining = matchAvailable - matchUnlocked;

  return { matchUnlocked, totalRaised, matchRemaining };
}
