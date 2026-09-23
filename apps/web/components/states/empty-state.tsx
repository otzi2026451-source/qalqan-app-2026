'use client';

import { useMemeMode } from '../meme-mode/meme-mode-provider';

export function EmptyState({
  title,
  strictMessage,
  memeMessage
}: {
  title: string;
  strictMessage: string;
  memeMessage: string;
}) {
  const { enabled } = useMemeMode();

  return (
    <div className="empty-state">
      <div className="empty-state__visual">:)</div>
      <strong>{title}</strong>
      <p>{enabled ? memeMessage : strictMessage}</p>
    </div>
  );
}
