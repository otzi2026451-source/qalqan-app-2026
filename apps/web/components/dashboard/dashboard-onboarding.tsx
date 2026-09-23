'use client';

import { useMemeMode } from '../meme-mode/meme-mode-provider';

export function DashboardOnboarding() {
  const { enabled } = useMemeMode();

  return (
    <section className="panel onboarding-panel">
      <p className="eyebrow">Onboarding</p>
      <h2>{enabled ? 'Your money app has personality now' : 'Welcome back to your banking space'}</h2>
      <p className="muted-copy">
        {enabled
          ? 'Balances stay serious. The side commentary just got a little more online.'
          : 'Track balances, review transfers and keep an eye on security events from one dashboard.'}
      </p>
    </section>
  );
}
