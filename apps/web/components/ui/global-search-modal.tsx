'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, ShoppingBag, Landmark, Newspaper, Shield, FileText } from 'lucide-react';
import { LIBRARY_BOOKS, MARKET_PRODUCTS, NEWS_MOCK, EGOV_SERVICES } from '../../lib/qalqan-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATIC_ROUTES = [
  { title: 'Моё пространство (Личный дашборд)', href: '/dashboard', category: 'Раздел', icon: FileText },
  { title: 'Академия: Расписание, оценки, задания', href: '/academy', category: 'Раздел', icon: BookOpen },
  { title: 'Государственные услуги (eGov Hub)', href: '/egov', category: 'Раздел', icon: Landmark },
  { title: 'QALQAN Market: Экипировка и техника', href: '/market', category: 'Раздел', icon: ShoppingBag },
  { title: 'QALQAN AI: Образовательный помощник', href: '/ai', category: 'Раздел', icon: Shield },
  { title: 'Цифровая библиотека: Учебные пособия', href: '/library', category: 'Раздел', icon: BookOpen },
  { title: 'Цифровая безопасность и тесты', href: '/security', category: 'Раздел', icon: Shield },
  { title: 'Сервисы Академии (Столовая, спорт, заявки)', href: '/services', category: 'Раздел', icon: FileText },
  { title: 'Новости и события Академии', href: '/news', category: 'Раздел', icon: Newspaper },
  { title: 'QALQAN Wallet: Переводы и баланс', href: '/transfers', category: 'Раздел', icon: FileText },
  { title: 'Личный профиль студента QALQAN ID', href: '/profile', category: 'Раздел', icon: FileText }
];

export function GlobalSearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        routes: STATIC_ROUTES.slice(0, 5),
        books: [],
        products: [],
        egov: [],
        news: []
      };
    }

    const matchedRoutes = STATIC_ROUTES.filter((r) => r.title.toLowerCase().includes(q));
    const matchedBooks = LIBRARY_BOOKS.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
    );
    const matchedProducts = MARKET_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
    const matchedEgov = EGOV_SERVICES.filter(
      (s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
    const matchedNews = NEWS_MOCK.filter(
      (n) => n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
    );

    return {
      routes: matchedRoutes,
      books: matchedBooks,
      products: matchedProducts,
      egov: matchedEgov,
      news: matchedNews
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} id="global-search-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--line)', paddingBottom: '14px' }}>
          <Search size={20} style={{ color: 'var(--gold)' }} />
          <input
            type="text"
            className="input"
            autoFocus
            placeholder="Поиск сервисов, книг, товаров, новостей..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: 0, fontSize: '16px' }}
          />
          <button
            onClick={onClose}
            className="button button-ghost"
            style={{ padding: '4px', minHeight: 'auto' }}
            aria-label="Закрыть поиск"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
          {results.routes.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '8px' }}>
                Разделы экосистемы
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.routes.map((route) => {
                  const Icon = route.icon;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--surface-hover)',
                        color: 'var(--text)',
                        fontSize: '14px'
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--gold)' }} />
                      <span style={{ fontWeight: 500 }}>{route.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {results.books.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '8px' }}>
                Учебные материалы и книги
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.books.map((book) => (
                  <Link
                    key={book.id}
                    href={`/library?q=${encodeURIComponent(book.title)}`}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-hover)',
                      fontSize: '14px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500 }}>{book.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{book.author} · {book.year}</div>
                    </div>
                    <span className="badge badge-gold" style={{ fontSize: '11px' }}>{book.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.products.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '8px' }}>
                QALQAN Market
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/market?q=${encodeURIComponent(product.name)}`}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-hover)',
                      fontSize: '14px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500 }}>{product.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{product.category}</div>
                    </div>
                    <strong style={{ color: 'var(--gold)' }}>{product.price.toLocaleString()} ₸</strong>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.egov.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '8px' }}>
                Государственные услуги
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.egov.map((service) => (
                  <Link
                    key={service.id}
                    href="/egov"
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-hover)',
                      fontSize: '14px'
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>{service.title}</div>
                    <span className="badge badge-muted" style={{ fontSize: '11px' }}>{service.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.news.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '8px' }}>
                Новости
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {results.news.map((news) => (
                  <Link
                    key={news.id}
                    href="/news"
                    onClick={onClose}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-hover)',
                      fontSize: '14px',
                      display: 'block'
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>{news.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{news.date} · {news.category}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query &&
            results.routes.length === 0 &&
            results.books.length === 0 &&
            results.products.length === 0 &&
            results.egov.length === 0 &&
            results.news.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--muted)' }}>
                По запросу «{query}» ничего не найдено в demo-базе.
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
