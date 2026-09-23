import Link from 'next/link';
import { 
  GraduationCap, 
  Landmark, 
  ShoppingBag, 
  Bot, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Award, 
  Clock, 
  ExternalLink, 
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { AppShell } from '../components/layout/app-shell';
import { STUDENT_MOCK, SCHEDULE_MOCK, GRADES_MOCK, EGOV_SERVICES, MARKET_PRODUCTS, NEWS_MOCK } from '../lib/qalqan-data';

export default function HomePage() {
  const previewSchedule = SCHEDULE_MOCK.slice(0, 3);
  const previewGrades = GRADES_MOCK.slice(0, 3);
  const previewEgov = EGOV_SERVICES.slice(0, 3);
  const previewProducts = MARKET_PRODUCTS.slice(0, 4);
  const previewNews = NEWS_MOCK.slice(0, 3);

  return (
    <AppShell>
      {/* Hero Section */}
      <section
        style={{
          padding: '48px 0 36px',
          borderBottom: '1px solid var(--line)',
          marginBottom: '40px'
        }}
        id="hero-section"
      >
        <div style={{ maxWidth: '820px' }}>
          <div className="eyebrow">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }} />
            Цифровая экосистема Академии
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--text)',
              marginBottom: '18px'
            }}
          >
            QALQAN
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-platinum)',
              lineHeight: 1.6,
              maxWidth: '680px',
              marginBottom: '28px'
            }}
          >
            Единое цифровое пространство для учёбы, государственных сервисов, технологий и повседневных задач.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
            <Link href="/dashboard" className="button button-primary" id="hero-open-app-btn">
              <span>Открыть приложение</span>
              <ArrowRight size={17} />
            </Link>
            <Link href="/egov" className="button button-secondary" id="hero-egov-btn">
              <Landmark size={17} style={{ color: 'var(--gold)' }} />
              <span>Государственные услуги</span>
            </Link>
          </div>

          {/* Быстрые действия */}
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontWeight: 600, marginBottom: '14px' }}>
              Быстрый доступ к сервисам
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}
            >
              {[
                { label: 'Учёба', href: '/academy', icon: GraduationCap, badge: 'Расписание' },
                { label: 'eGov', href: '/egov', icon: Landmark, badge: 'Госуслуги' },
                { label: 'Market', href: '/market', icon: ShoppingBag, badge: 'Каталог' },
                { label: 'QALQAN AI', href: '/ai', icon: Bot, badge: 'Ассистент' },
                { label: 'Библиотека', href: '/library', icon: BookOpen, badge: 'Учебники' },
                { label: 'Безопасность', href: '/security', icon: ShieldCheck, badge: 'Кибертест' }
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="card"
                    style={{
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      textDecoration: 'none'
                    }}
                    id={`quick-action-${action.label}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'var(--gold-muted)',
                          display: 'grid',
                          placeItems: 'center',
                          color: 'var(--gold)'
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <ChevronRight size={14} style={{ color: 'var(--muted)' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
                        {action.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                        {action.badge}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Preview Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {/* Preview: Академия */}
        <section id="section-preview-academy">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="eyebrow">Образовательный трек</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Академия</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
                Текущий учебный прогресс студента: {STUDENT_MOCK.name} ({STUDENT_MOCK.group})
              </p>
            </div>
            <Link href="/academy" className="button button-ghost button-sm" style={{ gap: '6px' }}>
              <span>Полное расписание и оценки</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-2">
            {/* Расписание preview */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} style={{ color: 'var(--gold)' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Ближайшие занятия</h3>
                </div>
                <span className="badge badge-gold">1 курс</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {previewSchedule.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-hover)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.subject}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                        <span>{item.time}</span>
                        <span>·</span>
                        <span>{item.room}</span>
                      </div>
                    </div>
                    <span className="badge badge-muted" style={{ fontSize: '11px' }}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Успеваемость preview */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} style={{ color: 'var(--gold)' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Успеваемость</h3>
                </div>
                <span className="badge badge-success">Средний балл: {STUDENT_MOCK.gpa}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {previewGrades.map((grade) => (
                  <div
                    key={grade.subject}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-hover)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{grade.subject}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                        Текущий балл: {grade.currentScore} / Рубежный: {grade.midterm}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: '16px', color: 'var(--gold)' }}>{grade.total}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Оценка: {grade.gradeLetter}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Preview: Государственные услуги (eGov) */}
        <section id="section-preview-egov">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="eyebrow">Цифровое государство</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Государственные услуги eGov</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
                Быстрый переход к официальным цифровым сервисам Республики Казахстан
              </p>
            </div>
            <Link href="/egov" className="button button-ghost button-sm" style={{ gap: '6px' }}>
              <span>Все госуслуги</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-3">
            {previewEgov.map((service) => (
              <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-gold">{service.category}</span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Популярно</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{service.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px' }}>
                    {service.description}
                  </p>
                </div>
                <a
                  href={service.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary button-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Открыть на eGov</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Preview: Market */}
        <section id="section-preview-market">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="eyebrow">Экипировка и аксессуары</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>QALQAN Market</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
                Товары для учёбы, спорта и повседневной жизни
              </p>
            </div>
            <Link href="/market" className="button button-ghost button-sm" style={{ gap: '6px' }}>
              <span>В каталог Market</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-4">
            {previewProducts.map((product) => (
              <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-muted">{product.category}</span>
                    {product.badge && <span className="badge badge-gold">{product.badge}</span>}
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', minHeight: '40px' }}>{product.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.4, marginBottom: '14px', minHeight: '34px' }}>
                    {product.description}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Цена</div>
                    <strong style={{ fontSize: '16px', color: 'var(--gold)' }}>{product.price.toLocaleString()} ₸</strong>
                  </div>
                  <Link href={`/market?id=${product.id}`} className="button button-secondary button-sm">
                    Купить
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preview: AI Assistant */}
        <section id="section-preview-ai">
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, var(--surface-card) 0%, rgba(197, 160, 89, 0.08) 100%)',
              border: '1px solid var(--border-gold)',
              padding: '32px'
            }}
          >
            <div className="grid-ai-preview">
              <div>
                <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} />
                  Образовательный интеллект
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '12px' }}>QALQAN AI</h2>
                <p style={{ color: 'var(--text-platinum)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  Интеллектуальный учебный ассистент поможет разобрать сложную тему, составить тест для самопроверки, сгенерировать опорный конспект или подготовиться к семинару.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Link href="/ai" className="button button-primary">
                    <Bot size={16} />
                    <span>Открыть диалог с AI</span>
                  </Link>
                  <Link href="/ai?prompt=Объяснить+криптографию" className="button button-secondary">
                    <span>Объяснить тему</span>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--line)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
                  <Bot size={16} style={{ color: 'var(--gold)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Демо-диалог</span>
                </div>
                <div style={{ background: 'var(--surface-hover)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', alignSelf: 'flex-end', maxWidth: '85%' }}>
                  В чем разница между симметричным и асимметричным шифрованием?
                </div>
                <div style={{ background: 'var(--gold-muted)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', alignSelf: 'flex-start', maxWidth: '95%', color: 'var(--text)' }}>
                  В <strong>симметричном</strong> используется один секретный ключ для шифрования и расшифровки (AES), а в <strong>асимметричном</strong> — пара ключей: открытый и закрытый (RSA, ECC)...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview: Новости */}
        <section id="section-preview-news">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="eyebrow">Информационная лента</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Новости Академии</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
                Актуальные события, достижения и официальные объявления (Demo content)
              </p>
            </div>
            <Link href="/news" className="button button-ghost button-sm" style={{ gap: '6px' }}>
              <span>Все новости</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-3">
            {previewNews.map((item) => (
              <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-gold">{item.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {item.readTime}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.4 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px' }}>
                    {item.summary}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.date}</span>
                  <Link href={`/news?id=${item.id}`} style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Читать <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
