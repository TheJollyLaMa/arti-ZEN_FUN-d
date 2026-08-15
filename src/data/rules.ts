/**
 * Configurable game rules and content policy.
 * Edit this file to update simulated amounts, timelines, and links.
 * ⚠️ All values here are for educational simulation only.
 *
 * Last reviewed: 2026-08-15
 */
export const RULES = {
  lastReviewed: '2026-08-15',
  simulated: true,

  /** Match Multiple used in Fund Drive simulation */
  defaultMatchMultiple: 3,

  /** Example Artifact sale amounts used in Fund Drive simulation */
  exampleSaleAmounts: [1, 5, 10, 25, 50],

  /** Total spaces on the board */
  totalSpaces: 30,

  /** Maximum points available */
  maxPoints: 500,

  /** Simulated available match per Fund in Fund Drive examples */
  simulatedMatchAvailable: 200,

  /** Link to official Artizen resources (update as needed) */
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
