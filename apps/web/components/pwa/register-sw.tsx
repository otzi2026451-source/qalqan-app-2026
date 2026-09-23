'use client';

import { useEffect } from 'react';
import { withBasePath } from '../../lib/base-path';

export function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(withBasePath('/sw.js')).catch(() => null);
    }
  }, []);

  return null;
}
