# 🌱 The Match Garden

An independent, educational mini-game that helps creators understand Artizen Funds, decide which Funds fit their projects, prepare stronger applications, and understand what happens after curation.

> **This is an independent project. It is not affiliated with, endorsed by, or sponsored by Artizen. All Fund information, balances, match amounts, and outcomes shown in the game are fictional examples for educational purposes only. Verify current information at [artizen.fund](https://artizen.fund) before taking action.**

---

## Intended Audience

The primary player is a creator who:
- Has an Artizen project or is considering creating one
- Has heard of Funds but does not fully understand them
- Does not know which Funds to apply to
- May be intimidated by applications or rejection
- Wants practical next steps rather than a long manual

No prior knowledge of funding terminology is required.

## Learning Goals

By the end of the game, players will understand:

1. A Fund is a curated pool that supports projects aligned with a particular mission
2. A project should apply only to Funds where there is genuine, explainable fit
3. Fund Directors make curation decisions — not algorithms
4. A rejection does not mean the project is bad; it may simply be a poor fit for this particular garden bed
5. Being curated can make additional match available during a Fund Drive
6. Available match is not automatic; creator activity and supporter purchases are needed to unlock it
7. Current rules, eligibility requirements, timelines, balances, and Match Multiples must be verified on Artizen
8. Running a Fund is an advanced path; creators should first understand the experience of applying

---

## Local Development Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Install and run

```bash
npm install
npm run dev        # serve the static site (http://localhost:4173)
npm test           # run all tests
npm run test:watch # run tests in watch mode
npm run lint       # run oxlint
```

You can also open `index.html` directly or deploy the repo root to GitHub Pages.

---

## Project Structure

```text
app.js               — Vanilla JS game shell and state/render loop
game.js              — Data, rules, reducers, and scoring helpers
app.css              — Page-specific styles
index.html           — Static GitHub Pages entry point
src/styles/global.css — Shared base styles
src/test/            — Vitest coverage (logic smoke tests + legacy checks)
```

---

## How to Add a Project

Edit `game.js`. Add a new object to the `PROJECTS` array:

```ts
{
  id: 'my-project',            // unique slug
  name: 'My Project Name',
  description: 'A short description.',
  traits: [
    'community-building',
    'arts-culture',
    // … match trait IDs used in funds.ts preferredTraits
  ],
}
```

The trait IDs must be lowercase hyphenated strings. Use the same IDs that appear in Fund `preferredTraits` for proper fit matching.

---

## How to Add or Edit a Sample Fund

Edit `game.js`. Add a new object to the `FUNDS` array:

```ts
{
  id: 'my-fund',               // unique slug
  name: 'The My Fund',
  mission: 'Short mission statement.',
  eligibilityRequirements: [
    'Must do X',
    'Must serve Y',
  ],
  preferredTraits: ['trait-a', 'trait-b', 'trait-c'],
  excludedTraits: ['bad-trait'],
  applicationStatus: 'open',   // 'open' | 'closed' | 'rolling'
  sampleAvailableMatch: '$1,000 (simulated)',
  note: '⚠️ Simulated example. Verify all details at artizen.fund before applying.',
}
```

⚠️ **All Funds must include the simulated disclaimer note.** Do not represent fictional Fund data as current or real.

---

## How to Change Simulated Match Rules

Edit `game.js`:

```ts
export const RULES = {
  lastReviewed: '2026-08-15',   // update when you review content
  defaultMatchMultiple: 3,       // the simulated match multiplier
  exampleSaleAmounts: [1, 5, 10, 25, 50],
  totalSpaces: 30,
  maxPoints: 500,
  officialLinks: {
    funds: 'https://artizen.fund/funds',
    // …
  },
  disclaimer: '…',
  verifyDisclaimer: '…',
};
```

Do not hardcode live Fund balances, Match Multiples, or activation thresholds into UI components — always reference `RULES`.

---

## How to Add Board Encounters

Edit `game.js`. Each space needs:

```ts
{
  id: 31,                      // must be unique and sequential
  type: 'decision',            // path|decision|soil-test|trellis|root|garden-guide|wild-bloom|reflection
  zone: 'bloom',               // plant|explore|cultivate|curate|bloom
  title: 'Space Title',
  content: 'What happens here.',
  options: [
    { id: 'opt-a', text: 'Answer A', isOptimal: false, feedback: '…', pointsEffect: 0 },
    { id: 'opt-b', text: 'Answer B', isOptimal: true,  feedback: '…', pointsEffect: 15 },
  ],
}
```

For `trellis` spaces, add `trellisAdvance: 3`.  
For `root` spaces, add `rootSetback: 2`.  
For `reflection` spaces, add `reflectionKey: 'unique-key'`.

---

## Accessibility Approach

The Match Garden targets WCAG 2.2 AA:

- **Keyboard navigation**: All interactive elements are reachable via Tab/Enter/Space
- **Focus indicators**: Visible `:focus-visible` outlines on all controls
- **Semantic HTML**: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>`, `<aside>`, ARIA landmark roles
- **Screen readers**: `aria-label`, `aria-live`, `aria-expanded`, `role="status"`, `role="alert"`, `.sr-only` for visually-hidden text
- **No color-only communication**: All status indicators include text or icon labels
- **Contrast**: Garden palette meets 4.5:1 contrast for text
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` suppresses animations; in-game toggle available
- **Touch targets**: All buttons and interactive elements are at least 44×44px
- **Board alternative**: A list-view of all 30 spaces is available via the "List View" toggle during play
- **No inaccessible drag-and-drop**: All interactions are click/tap/keyboard

---

## Content Accuracy Policy

Artizen's program mechanics change. Therefore:

- No live Fund balances, Match Multiples, review times, or opening statuses are hardcoded
- All changeable rules and amounts are in `game.js`
- Every simulated amount is labeled `(simulated)`
- Every Fund card includes a disclaimer note
- The `RULES.lastReviewed` field should be updated whenever content is reviewed
- Players are reminded to verify information at artizen.fund before taking action
- This game does not call the Artizen API or scrape any live data
- This game does not use Artizen logos or proprietary artwork

---

## Licensing

Source code is licensed under the **MIT License** (see `LICENSE`).

Educational text and game content in this repository is original and created for this project.

This project does not claim rights to:
- The Artizen name, brand, logos, or trademarks
- Artizen Fund descriptions, Playbook content, or proprietary program mechanics
- Any third-party artwork, fonts, or libraries

If you include external assets, ensure they are properly licensed and attributed.

---

## Independent-Project Disclaimer

The Match Garden is an **independent** educational game created by contributors to this repository. It is **not** affiliated with, endorsed by, produced by, or sponsored by Artizen or its team. The fictional Funds, match amounts, outcomes, and processes shown in this game are invented for learning purposes only.

Always verify current information at [artizen.fund](https://artizen.fund) before making real decisions about applying to Funds, submitting projects, or participating in Fund Drives.

---

## Game Milestones

| Milestone | Status |
|---|---|
| 1: Playable board (welcome, project picker, 30 spaces, spinner, movement) | ✅ Complete |
| 2: Fund fit (Fund cards, soil tests, fit engine, explanations) | ✅ Complete |
| 3: Application & curation (pitch builder, simulated Director response) | ✅ Complete |
| 4: Fund Drive & conclusion (match simulation, Garden Plan, persistence) | ✅ Complete |
| 5: Polish (accessibility audit, list-view board, documentation) | ✅ Complete |
