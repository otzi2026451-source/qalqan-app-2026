import Link from 'next/link';

export function QalqanLogo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <Link href="/" className="logo-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }} id="qalqan-logo">
      <div
        style={{
          width: isLarge ? '40px' : isSmall ? '28px' : '34px',
          height: isLarge ? '40px' : isSmall ? '28px' : '34px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #15253A 0%, #0B1422 100%)',
          border: '1px solid var(--border-gold)',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        {/* Geometric minimalist shield / circuit symbol: flat, geometric, symmetric, no weapons */}
        <svg
          width={isLarge ? '24' : isSmall ? '16' : '20'}
          height={isLarge ? '24' : isSmall ? '16' : '20'}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield outline */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.5 21 12 22.5C16.5 21 20 16.5 20 11.5V5.5L12 2Z"
            stroke="var(--gold)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central digital circuit node */}
          <path
            d="M12 7V17M8 11H16"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="11" r="2" fill="var(--gold)" />
          <circle cx="12" cy="7" r="1.2" fill="var(--gold)" />
          <circle cx="12" cy="17" r="1.2" fill="var(--gold)" />
          <circle cx="8" cy="11" r="1.2" fill="var(--gold)" />
          <circle cx="16" cy="11" r="1.2" fill="var(--gold)" />
        </svg>
      </div>
      <div>
        <div
          style={{
            fontSize: isLarge ? '20px' : isSmall ? '15px' : '17px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: 'var(--text)',
            lineHeight: 1
          }}
        >
          QALQAN
        </div>
        {!isSmall && (
          <div
            style={{
              fontSize: '10px',
              color: 'var(--gold)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginTop: '2px'
            }}
          >
            Экосистема Академии
          </div>
        )}
      </div>
    </Link>
  );
}
