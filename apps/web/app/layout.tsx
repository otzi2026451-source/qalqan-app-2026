import type { Metadata } from 'next';
import { RegisterServiceWorker } from '../components/pwa/register-sw';
import { withBasePath } from '../lib/base-path';
import './globals.css';

export const metadata: Metadata = {
  title: 'QALQAN | Цифровая экосистема Академии',
  description: 'Единое цифровое пространство для учёбы, государственных сервисов, технологий и повседневных задач.',
  manifest: withBasePath('/manifest.webmanifest'),
  openGraph: {
    title: 'QALQAN — Цифровая экосистема Академии',
    description: 'Учебные сервисы, eGov hub, AI-помощник, маркетплейс и цифровая безопасность в одном приложении.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="dark">
      <head>
        <meta name="theme-color" content="#111E2F" />
      </head>
      <body>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
