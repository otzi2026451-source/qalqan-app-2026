'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Landmark, ShoppingBag, User } from 'lucide-react';

const ITEMS = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/academy', label: 'Академия', icon: BookOpen },
  { href: '/egov', label: 'eGov', icon: Landmark },
  { href: '/market', label: 'Market', icon: ShoppingBag },
  { href: '/profile', label: 'Профиль', icon: User }
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="mobile-tabbar" aria-label="Мобильная навигация" id="qalqan-mobile-nav">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-tabbar__item ${isActive ? 'active' : ''}`}
            id={`mobile-tab-${item.href.replace('/', '') || 'home'}`}
          >
            <Icon size={20} style={{ color: isActive ? 'var(--gold)' : 'var(--muted)' }} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
