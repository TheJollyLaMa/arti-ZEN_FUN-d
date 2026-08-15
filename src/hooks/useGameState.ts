import { useReducer, useEffect, useState } from 'react';
import { gameReducer, INITIAL_STATE } from '../game/gameReducer';
import type { GameState, GameAction } from '../game/types';

const STORAGE_KEY = 'match-garden-state';

export function useGameState(): [GameState, React.Dispatch<GameAction>] {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameState;
        return parsed;
      }
    } catch {
      // ignore
    }
    return init;
  });

  // Persist state on every change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...state, savedAt: Date.now() })
      );
    } catch {
      // ignore
    }
  }, [state]);

  return [state, dispatch];
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Returns true if reduced motion is preferred.
 * Subscribes to OS-level preference changes so the UI updates live.
 */
export function useReducedMotion(stateReducedMotion: boolean): boolean {
  const [systemPrefers, setSystemPrefers] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefers(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return stateReducedMotion || systemPrefers;
}
