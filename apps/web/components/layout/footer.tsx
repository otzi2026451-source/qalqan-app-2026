import Link from 'next/link';
import { QalqanLogo } from './qalqan-logo';

export function Footer() {
  return (
    <footer className="footer" id="qalqan-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <QalqanLogo size="large" />
            <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '340px', lineHeight: 1.6 }}>
              Единое цифровое пространство для учёбы, государственных сервисов, технологий и повседневных задач в учебной среде.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <Link href="/dashboard" className="button button-secondary button-sm" style={{ fontSize: '12px' }}>
                Моё пространство
              </Link>
              <Link href="/transfers" className="button button-ghost button-sm" style={{ fontSize: '12px' }}>
                QALQAN Wallet
              </Link>
            </div>
          </div>

          <div className="footer-links-col">
            <div className="footer-title">Образование</div>
            <Link href="/academy" className="footer-link">Академия</Link>
            <Link href="/library" className="footer-link">Цифровая библиотека</Link>
            <Link href="/dashboard" className="footer-link">Учебный прогресс</Link>
            <Link href="/ai" className="footer-link">AI-помощник</Link>
          </div>

          <div className="footer-links-col">
            <div className="footer-title">Сервисы</div>
            <Link href="/egov" className="footer-link">Государственные услуги (eGov)</Link>
            <Link href="/market" className="footer-link">QALQAN Market</Link>
            <Link href="/services" className="footer-link">Столовая и быт</Link>
            <Link href="/news" className="footer-link">Новости и события</Link>
          </div>

          <div className="footer-links-col">
            <div className="footer-title">Безопасность</div>
            <Link href="/security" className="footer-link">Цифровая безопасность</Link>
            <Link href="/profile" className="footer-link">QALQAN ID</Link>
            <Link href="/login" className="footer-link">Авторизация</Link>
            <Link href="/services" className="footer-link">Поддержка</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)' }}>
              © 2026 QALQAN
            </div>
            <div className="badge badge-gold" style={{ fontSize: '11px' }}>
              Учебный прототип
            </div>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6, marginTop: '6px' }}>
            Учебный прототип цифровой экосистемы. Не является официальной государственной информационной системой.
            Не запрашивает и не хранит реальные ИИН, ЭЦП, служебные или персональные данные граждан Республики Казахстан.
          </p>
        </div>
      </div>
    </footer>
  );
}
