import type { MetadataRoute } from 'next';
import { withBasePath } from '../lib/base-path';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QALQAN — Цифровая экосистема Академии',
    short_name: 'QALQAN',
    description: 'Учебные сервисы, eGov hub, AI-помощник, маркетплейс и цифровая безопасность.',
    start_url: withBasePath('/'),
    display: 'standalone',
    background_color: '#0B1422',
    theme_color: '#111E2F',
    icons: [
      {
        src: withBasePath('/icons/icon-192.svg'),
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable'
      },
      {
        src: withBasePath('/icons/icon-512.svg'),
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ]
  };
}
