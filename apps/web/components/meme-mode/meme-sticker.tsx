'use client';

import { useMemeMode } from './meme-mode-provider';

export function MemeSticker({
  label,
  caption
}: {
  label: string;
  caption: string;
}) {
  const { enabled } = useMemeMode();

  if (!enabled) {
    return null;
  }

  return (
    <aside className="meme-sticker" aria-label="Meme sticker">
      <span className="meme-sticker__emoji">{label}</span>
      <p>{caption}</p>
    </aside>
  );
}
