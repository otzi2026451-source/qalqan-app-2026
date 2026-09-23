'use client';

import { useMemeMode } from './meme-mode-provider';

export function MemeToggle() {
  const { enabled, toggle } = useMemeMode();

  return (
    <button
      className={`mode-chip ${enabled ? 'mode-chip--active' : ''}`}
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
    >
      Meme mode: {enabled ? 'On' : 'Off'}
    </button>
  );
}
