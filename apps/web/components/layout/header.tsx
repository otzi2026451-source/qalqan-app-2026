'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, User } from 'lucide-react';
import { QalqanLogo } from './qalqan-logo';
import { ThemeToggle } from './theme-toggle';
import { GlobalSearchModal } from '../ui/global-search-modal';
import { NotificationsModal } from '../ui/notifications-modal';
import { INITIAL_NOTIFICATIONS, NotificationItem, STUDENT_MOCK } from '../../lib/qalqan-data';

const NAV_ITEMS = [
  { href: '/', label: 'Главная' },
  { href: '/academy', label: 'Академия' },
  { href: '/egov', label: 'eGov' },
  { href: '/market', label: 'Market' },
  { href: '/ai', label: 'AI' },
  { href: '/services', label: 'Сервисы' },
  { href: '/news', label: 'Новости' }
];

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    const saved = localStorage.getItem('qalqan-notifications');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveNotifications = (updated: NotificationItem[]) => {
    setNotifications(updated);
    localStorage.setItem('qalqan-notifications', JSON.stringify(updated));
  };

  const handleToggleRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n));
    saveNotifications(updated);
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="header-wrapper" id="qalqan-header">
      <div className="header-container">
        <QalqanLogo />

        <nav className="header-nav" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                id={`nav-${item.href.replace('/', '') || 'home'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          {/* Global Search Button */}
          <button
            className="button button-ghost button-sm"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Поиск по экосистеме"
            id="header-search-btn"
            style={{ padding: '0 10px', minWidth: '40px', minHeight: '40px' }}
          >
            <Search size={18} />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Button with Counter */}
          <button
            className="button button-ghost button-sm"
            onClick={() => setIsNotifOpen(true)}
            aria-label="Уведомления"
            id="header-notifications-btn"
            style={{ position: 'relative', padding: '0 10px', minWidth: '40px', minHeight: '40px' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  background: 'var(--gold)',
                  color: '#0B1422',
                  fontSize: '10px',
                  fontWeight: 800,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  lineHeight: 1
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile link */}
          <Link
            href="/profile"
            className="button button-secondary button-sm"
            id="header-profile-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <User size={15} style={{ color: 'var(--gold)' }} />
            <span className="header-profile-name" style={{ fontSize: '13px', fontWeight: 600 }}>{STUDENT_MOCK.name.split(' ')[0]}</span>
          </Link>
        </div>
      </div>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onToggleRead={handleToggleRead}
        onMarkAllRead={handleMarkAllRead}
      />
    </header>
  );
}
