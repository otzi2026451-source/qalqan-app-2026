import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { QalqanLogo } from '../components/layout/qalqan-logo';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        display: 'grid',
        placeItems: 'center',
        padding: '24px'
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '460px',
          width: '100%',
          textAlign: 'center',
          padding: '40px 28px',
          border: '1px solid var(--border-gold)'
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <QalqanLogo size="large" />
        </div>
        <div className="eyebrow" style={{ color: 'var(--gold)', justifyContent: 'center' }}>
          Ошибка 404
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, marginTop: '4px', marginBottom: '8px' }}>
          Страница не найдена
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
          Запрашиваемый ресурс экосистемы QALQAN перемещен или временно недоступен.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="button button-primary" style={{ gap: '6px' }}>
            <Home size={15} />
            <span>На главную</span>
          </Link>
          <Link href="/dashboard" className="button button-secondary" style={{ gap: '6px' }}>
            <span>Моё пространство</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
