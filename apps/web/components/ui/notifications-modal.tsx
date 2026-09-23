'use client';

import { useState } from 'react';
import { Bell, Check, CheckCheck, X, BookOpen, ShoppingBag, Shield, Activity, GraduationCap } from 'lucide-react';
import { INITIAL_NOTIFICATIONS, NotificationItem } from '../../lib/qalqan-data';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onToggleRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  'Учёба': GraduationCap,
  'Академия': BookOpen,
  'Market': ShoppingBag,
  'Сервисы': Activity,
  'Безопасность': Shield
};

export function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onToggleRead,
  onMarkAllRead
}: NotificationsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  if (!isOpen) return null;

  const categories = ['Все', 'Учёба', 'Академия', 'Market', 'Сервисы', 'Безопасность'];

  const filtered = selectedCategory === 'Все'
    ? notifications
    : notifications.filter((n) => n.category === selectedCategory);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="modal-backdrop" onClick={onClose} id="notifications-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} style={{ color: 'var(--gold)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Центр уведомлений</h3>
            {unreadCount > 0 && (
              <span className="badge badge-gold" style={{ fontSize: '11px' }}>
                {unreadCount} новых
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="button button-ghost button-sm"
                style={{ fontSize: '12px' }}
                title="Отметить все как прочитанные"
              >
                <CheckCheck size={14} />
                <span>Прочитать все</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="button button-ghost"
              style={{ padding: '4px', minHeight: 'auto' }}
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Categories filter tabs */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`button button-sm ${selectedCategory === cat ? 'button-primary' : 'button-secondary'}`}
              style={{ padding: '0 12px', minHeight: '32px', fontSize: '12px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '55vh', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--muted)' }}>
              Нет уведомлений в данной категории
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = CATEGORY_ICONS[item.category] || Bell;
              return (
                <div
                  key={item.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: item.read ? 'var(--surface-hover)' : 'rgba(197, 160, 89, 0.08)',
                    border: item.read ? '1px solid var(--line)' : '1px solid var(--border-gold)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: item.read ? 'var(--surface)' : 'var(--gold-muted)',
                      color: item.read ? 'var(--muted)' : 'var(--gold)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ fontWeight: item.read ? 600 : 700, fontSize: '14px' }}>
                        {item.title}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                        {item.time}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                      {item.body}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span className="badge badge-muted" style={{ fontSize: '11px' }}>
                        {item.category}
                      </span>
                      <button
                        onClick={() => onToggleRead(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: item.read ? 'var(--muted)' : 'var(--gold)',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Check size={12} />
                        {item.read ? 'Сделать непрочитанным' : 'Прочитано'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
