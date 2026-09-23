'use client';

import { useState } from 'react';
import { useMemeMode } from './meme-mode-provider';

type Variant = 'success' | 'error';

export function MemeToastDemo({
  successText,
  memeSuccessText,
  errorText,
  memeErrorText
}: {
  successText: string;
  memeSuccessText: string;
  errorText: string;
  memeErrorText: string;
}) {
  const { enabled } = useMemeMode();
  const [toast, setToast] = useState<{ variant: Variant; text: string } | null>(null);

  const showToast = (variant: Variant) => {
    const text =
      variant === 'success'
        ? enabled
          ? memeSuccessText
          : successText
        : enabled
          ? memeErrorText
          : errorText;

    setToast({ variant, text });
    window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <>
      {toast ? <div className={`toast-demo toast-demo--${toast.variant}`}>{toast.text}</div> : null}
      <div className="inline-actions">
        <button className="button" type="button" onClick={() => showToast('success')}>
          Preview success
        </button>
        <button className="button button--ghost" type="button" onClick={() => showToast('error')}>
          Preview error
        </button>
      </div>
    </>
  );
}
