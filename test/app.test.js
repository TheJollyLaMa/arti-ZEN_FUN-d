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

    document.querySelector('[data-action="toggle-list-view"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );

    expect(document.querySelector('.board-shell')?.classList.contains('is-expanded')).toBe(true);
  });
});
