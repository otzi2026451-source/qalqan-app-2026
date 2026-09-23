'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search, SlidersHorizontal } from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { NEWS_CATEGORIES, NEWS_MOCK } from '../../lib/qalqan-data';

const formatDate = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredNews = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const categoryFiltered = selectedCategory === 'Все'
      ? NEWS_MOCK
      : NEWS_MOCK.filter((item) => item.category === selectedCategory);

    const textFiltered = query
      ? categoryFiltered.filter((item) => `${item.title} ${item.summary} ${item.shortDescription}`.toLowerCase().includes(query))
      : categoryFiltered;

    return [...textFiltered].sort((a, b) => {
      const left = new Date(a.date).getTime();
      const right = new Date(b.date).getTime();
      return sortBy === 'newest' ? right - left : left - right;
    });
  }, [searchValue, selectedCategory, sortBy]);

  return (
    <AppShell
      eyebrow="Официальный вестник"
      heading="Новости Академии"
      subheading="Актуальные события, научные исследования, спортивные достижения и практические семинары."
    >
      <div className="card" style={{ padding: '18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Поиск по новостям"
              style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '12px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={16} style={{ color: 'var(--gold)' }} />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as 'newest' | 'oldest')}
              style={{ padding: '10px 12px', borderRadius: '12px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)' }}
            >
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
            </select>
          </div>
        </div>

        <div className="tabs-container" id="news-category-tabs">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              id={`tab-news-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-3" id="news-grid">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <article
              key={item.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflow: 'hidden', padding: 0 }}
              id={`news-card-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                onError={(event) => {
                  const target = event.currentTarget as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80';
                }}
              />

              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '11px' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {item.readTime}
                  </span>
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.35 }}>
                  {item.title}
                </h2>

                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  {formatDate(item.date)}
                </div>

                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}>
                  {item.shortDescription}
                </p>

                <Link href={`/news/${item.slug}`} className="button button-primary button-sm" style={{ gap: '6px', display: 'inline-flex', alignItems: 'center' }}>
                  <span>Подробнее</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="card" style={{ gridColumn: '1 / -1', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '8px' }}>Новостей по вашему запросу не найдено</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>Попробуйте изменить фильтр или очистить поисковый запрос.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
