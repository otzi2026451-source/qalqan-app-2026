'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Search, Filter, Download, Eye, Star, X, Check } from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { LIBRARY_BOOKS, LibraryBook } from '../../lib/qalqan-data';
import { useToast } from '../../components/ui/toast-context';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);
  const { showToast } = useToast();

  const categories = [
    'Все',
    'История Казахстана',
    'Право',
    'IT',
    'Информационная безопасность',
    'Математика',
    'Языки'
  ];

  const filteredBooks = useMemo(() => {
    return LIBRARY_BOOKS.filter((book) => {
      const matchCat = selectedCategory === 'Все' || book.category === selectedCategory;
      const matchSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <AppShell
      eyebrow="Электронный фонд"
      heading="Цифровая библиотека"
      subheading="Учебные пособия, научные издания, монографии и стандарты кибербезопасности для курсантов и преподавателей."
    >
      {/* Search and Category Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        <div style={{ position: 'relative', maxWidth: '640px' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }}
          />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: '42px' }}
            placeholder="Найти книгу или учебный материал..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="library-search-input"
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`button button-sm ${selectedCategory === cat ? 'button-primary' : 'button-secondary'}`}
              style={{ fontSize: '13px' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid-3" id="library-books-grid">
        {filteredBooks.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 20px', color: 'var(--muted)' }}>
            <BookOpen size={36} style={{ margin: '0 auto 12px', color: 'var(--gold)' }} />
            <p>По вашему запросу не найдено учебных материалов.</p>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              id={`book-card-${book.id}`}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '11px' }}>
                    {book.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--gold)' }}>
                    <Star size={13} fill="var(--gold)" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3 }}>
                  {book.title}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '10px' }}>
                  {book.author} · {book.year}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {book.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--line)'
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {book.pages} стр. · {book.format}
                </span>
                <button
                  onClick={() => setSelectedBook(book)}
                  className="button button-secondary button-sm"
                  id={`book-detail-btn-${book.id}`}
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="modal-backdrop" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '6px' }}>{selectedBook.category}</span>
                <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{selectedBook.title}</h2>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                  {selectedBook.author} · {selectedBook.year} г.
                </div>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="button button-ghost"
                style={{ padding: '4px', minHeight: 'auto' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-platinum)', marginBottom: '20px' }}>
              {selectedBook.description}
            </p>

            <div style={{ background: 'var(--surface-hover)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '13px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>Количество страниц: <strong>{selectedBook.pages}</strong></div>
              <div>Формат: <strong>{selectedBook.format}</strong></div>
              <div>Оценка читателей: <strong>{selectedBook.rating} / 5.0</strong></div>
              <div>Доступ: <strong>Свободный для курсантов</strong></div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  showToast(`Загрузка книги «${selectedBook.title}» начата`);
                  setSelectedBook(null);
                }}
                className="button button-secondary"
              >
                <Download size={16} />
                <span>Скачать PDF</span>
              </button>
              <button
                onClick={() => {
                  showToast(`Открыт электронный ридер: ${selectedBook.title}`);
                  setSelectedBook(null);
                }}
                className="button button-primary"
              >
                <Eye size={16} />
                <span>Читать онлайн</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
