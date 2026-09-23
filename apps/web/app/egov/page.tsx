'use client';

import { useState } from 'react';
import { Landmark, ExternalLink, ShieldAlert, FileText, CreditCard, HelpCircle, HeartPulse, Users } from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { EGOV_SERVICES, EgovService } from '../../lib/qalqan-data';

export default function EgovPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = [
    'Все',
    'Документы',
    'Налоги и платежи',
    'Справки',
    'Социальные услуги',
    'Здравоохранение'
  ];

  const filteredServices = selectedCategory === 'Все'
    ? EGOV_SERVICES
    : EGOV_SERVICES.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Документы': return FileText;
      case 'Налоги и платежи': return CreditCard;
      case 'Справки': return HelpCircle;
      case 'Социальные услуги': return Users;
      case 'Здравоохранение': return HeartPulse;
      default: return Landmark;
    }
  };

  return (
    <AppShell
      eyebrow="Государственные цифровые сервисы"
      heading="Государственные услуги"
      subheading="Быстрый доступ к популярным цифровым сервисам Казахстана."
    >
      {/* Disclaimer Banner */}
      <div
        className="card"
        style={{
          border: '1px solid var(--border-gold)',
          background: 'var(--surface-hover)',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px'
        }}
        id="egov-disclaimer-banner"
      >
        <ShieldAlert size={22} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ fontSize: '14px', color: 'var(--text)' }}>
            Информационный правовой каталог
          </strong>
          <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginTop: '4px' }}>
            QALQAN использует ссылки на официальный портал eGov.kz. Данный раздел является информационным каталогом и не заменяет официальный государственный сервис.
            В целях вашей цифровой безопасности проект не запрашивает ИИН, пароли госуслуг или файлы ЭЦП.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="tabs-container" id="egov-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            id={`tab-egov-${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid-3" id="egov-services-grid">
        {filteredServices.map((service) => {
          const Icon = getCategoryIcon(service.category);
          return (
            <div
              key={service.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              id={`egov-card-${service.id}`}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'var(--gold-muted)',
                      color: 'var(--gold)',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="badge badge-muted" style={{ fontSize: '11px' }}>
                    {service.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px' }}>
                  {service.description}
                </p>
              </div>

              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                <a
                  href={service.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary button-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                  id={`btn-open-egov-${service.id}`}
                >
                  <span>Открыть на eGov</span>
                  <ExternalLink size={14} style={{ color: 'var(--gold)' }} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
