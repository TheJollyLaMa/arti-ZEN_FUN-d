// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('game shell interactions', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    window.localStorage.clear();
    vi.resetModules();
  });

  it('supports the full click-through flow with the legacy board toggle action', async () => {
    await import('../app.js');

    document.querySelector('[data-action="start-game"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(document.body.textContent).toContain('Choose Your Project Seed');

    document.querySelector('[data-action="select-project"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(document.body.textContent).toContain('Space 0 / 30');
    expect(document.querySelector('.board-shell')?.classList.contains('is-compact')).toBe(true);
    expect(document.querySelector('.board-shell')?.classList.contains('board-shell--immersive')).toBe(true);
    expect(document.querySelector('.board-view__legend')?.textContent).toContain('Centered on your current place');

    document.querySelector('[data-action="board-zoom-in"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(document.querySelector('.board-view__legend')?.textContent).toContain('Close-up view with pan controls');

    document.querySelector('[data-action="toggle-list-view"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(document.querySelector('.board-shell')?.classList.contains('is-expanded')).toBe(true);

    document.querySelector('[data-action="go-home"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(document.body.textContent).toContain('Welcome to The Match Garden');
    expect(document.querySelector('[data-action="go-home"]')).toBeNull();
  });

  it('offers a back-to-the-beginning reset when no Funds are curated', async () => {
    window.localStorage.setItem(
      'match-garden-state-v1',
      JSON.stringify({
        phase: 'curation',
        curationResults: [
          { fundId: 'community-spaces', outcome: 'not-eligible', explanation: 'No match.' },
        ],
      }),
    );

    await import('../app.js');

    expect(document.body.textContent).toContain('Do not pass go');

    document.querySelector('[data-action="play-again"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(document.body.textContent).toContain('Welcome to The Match Garden');
  });
});
