'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

type MemeModeContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const MemeModeContext = createContext<MemeModeContextValue | null>(null);

export function MemeModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('ilyas-meme-mode');
    const nextValue = stored === 'true';
    setEnabled(nextValue);
    document.documentElement.dataset.memeMode = nextValue ? 'on' : 'off';
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      toggle: () => {
        setEnabled((current) => {
          const next = !current;
          window.localStorage.setItem('ilyas-meme-mode', String(next));
          document.documentElement.dataset.memeMode = next ? 'on' : 'off';
          return next;
        });
      }
    }),
    [enabled]
  );

  return <MemeModeContext.Provider value={value}>{children}</MemeModeContext.Provider>;
}

export function useMemeMode() {
  const context = useContext(MemeModeContext);

  if (!context) {
    throw new Error('useMemeMode must be used inside MemeModeProvider');
  }

  return context;
}
