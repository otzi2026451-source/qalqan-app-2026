'use client';

import { ReactNode } from 'react';
import { useMemeMode } from './meme-mode-provider';

export function MemeCopy({
  defaultText,
  memeText,
  className = 'meme-copy'
}: {
  defaultText: ReactNode;
  memeText: ReactNode;
  className?: string;
}) {
  const { enabled } = useMemeMode();

  return <p className={className}>{enabled ? memeText : defaultText}</p>;
}
