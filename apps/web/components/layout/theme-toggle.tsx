'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('qalqan-theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('qalqan-theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      className="button button-ghost button-sm"
      type="button"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      aria-label="Сменить тему оформления"
      id="theme-toggle-button"
      style={{ padding: '0 10px', minWidth: '40px', minHeight: '40px' }}
    >
      {theme === 'dark' ? (
        <Sun size={17} style={{ color: 'var(--gold)' }} />
      ) : (
        <Moon size={17} style={{ color: 'var(--gold)' }} />
      )}
    </button>
  );
}
