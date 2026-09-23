import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Newspaper } from 'lucide-react';
import { AppShell } from '../../../components/layout/app-shell';
import { NEWS_MOCK, getRelatedNews, getNewsBySlug } from '../../../lib/qalqan-data';

const formatDate = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

export function generateStaticParams() {
  return NEWS_MOCK.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedNews(article.slug, article.category);

  return (
    <AppShell
      eyebrow="Новости и события"
      heading={article.title}
      subheading={article.shortDescription}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
        <Link href="/news" className="button button-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} />
          Назад к новостям
        </Link>
        <span className="badge badge-gold">{article.category}</span>
      </div>

      <div className="card" style={{ overflow: 'hidden', padding: 0, marginBottom: '24px' }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
        />

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '18px', color: 'var(--muted)', fontSize: '13px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {formatDate(article.date)}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {article.readTime}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Newspaper size={14} /> {article.source}</span>
          </div>

          <h2 style={{ fontSize: '28px', marginBottom: '18px', lineHeight: 1.2 }}>{article.title}</h2>

          <div style={{ color: 'var(--text-platinum)', lineHeight: 1.8, fontSize: '15px' }}>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={`${article.slug}-p-${index}`} style={{ margin: '0 0 14px' }}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 16px' }}>Похожие новости</h3>
          <div className="grid-3">
            {related.map((item) => (
              <article key={item.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--gold)', marginBottom: '8px' }}>{item.category}</div>
                  <h4 style={{ margin: '0 0 8px', fontSize: '18px' }}>{item.title}</h4>
                  <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '10px' }}>{formatDate(item.date)}</div>
                  <Link href={`/news/${item.slug}`} className="button button-secondary button-sm">Подробнее</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
