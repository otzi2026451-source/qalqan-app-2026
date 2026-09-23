'use client';

import { useState } from 'react';
import { useMemeMode } from '../meme-mode/meme-mode-provider';

export function BalanceCard({
  currency,
  balance,
  note
}: {
  currency: string;
  balance: number;
  note: string;
}) {
  const { enabled } = useMemeMode();
  const [tapCount, setTapCount] = useState(0);

  const onReveal = () => {
    if (!enabled) {
      return;
    }

    setTapCount((current) => (current >= 4 ? 0 : current + 1));
  };

  return (
    <button className="balance-card balance-card--button" type="button" onClick={onReveal}>
      <span>{currency} account</span>
      <strong>
        {balance.toLocaleString()} {currency}
      </strong>
      <small>{note}</small>
      {enabled && tapCount >= 4 ? (
        <span className="secret-chip">Certified yap-resistant budget. Very demure.</span>
      ) : null}
    </button>
  );
}
