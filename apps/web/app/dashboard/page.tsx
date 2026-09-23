'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  GraduationCap, 
  Clock, 
  Percent, 
  Calendar, 
  Landmark, 
  BookOpen, 
  ShoppingBag, 
  Bot, 
  LifeBuoy, 
  Bell, 
  ArrowRight,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { SpendingChart } from '../../components/charts/spending-chart';
import { STUDENT_MOCK, INITIAL_NOTIFICATIONS } from '../../lib/qalqan-data';

export default function DashboardPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS.slice(0, 3));

  // Wallet demo data
  const [accounts] = useState([
    { id: 'acc-kzt', currency: 'KZT', balance: 1280450, isPrimary: true, name: 'Основной счёт (Стипендия)' },
    { id: 'acc-usd', currency: 'USD', balance: 2430, isPrimary: false, name: 'Валютный счёт USD' },
    { id: 'acc-eur', currency: 'EUR', balance: 1180, isPrimary: false, name: 'Валютный счёт EUR' }
  ]);

  const [transactions] = useState([
    { id: 'tx1', title: 'QALQAN Market: Рюкзак Pro', date: 'Сегодня, 11:30', amount: -24900, currency: 'KZT', status: 'SUCCESS' },
    { id: 'tx2', title: 'Начисление академической стипендии', date: '20 сентября 2026', amount: 84000, currency: 'KZT', status: 'SUCCESS' },
    { id: 'tx3', title: 'Столовая Академии (Комплексный обед)', date: '19 сентября 2026', amount: -1800, currency: 'KZT', status: 'SUCCESS' },
    { id: 'tx4', title: 'Пополнение карты через Kaspi', date: '18 сентября 2026', amount: 50000, currency: 'KZT', status: 'SUCCESS' }
  ]);

  const analyticsData = [
    { month: 'Май', income: 84000, spending: 42000 },
    { month: 'Июн', income: 84000, spending: 39000 },
    { month: 'Июл', income: 95000, spending: 51000 },
    { month: 'Авг', income: 84000, spending: 68000 },
    { month: 'Сен', income: 134000, spending: 52000 }
  ];

  return (
    <AppShell
      eyebrow="Личный кабинет курсанта"
      heading="Моё пространство"
      subheading="Учебный статус, расписание занятий, госуслуги и финансовый кошелек в едином интерфейсе."
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--gold-muted)',
              border: '1px solid var(--border-gold)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--gold)'
            }}
          >
            <User size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>{STUDENT_MOCK.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {STUDENT_MOCK.course} · {STUDENT_MOCK.group}
            </div>
          </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Core Student Metrics Grid */}
        <section className="grid-3" id="student-kpi-grid">
          {/* Учебный прогресс */}
          <div className="card stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Учебный прогресс</span>
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
                <GraduationCap size={18} />
              </div>
            </div>
            <div className="stat-value" style={{ color: 'var(--gold)' }}>
              {STUDENT_MOCK.gpa}
            </div>
            <div className="stat-subtext" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-gold" style={{ padding: '2px 8px', fontSize: '11px' }}>
                Рейтинг A-
              </span>
              <span>Средний академический балл</span>
            </div>
          </div>

          {/* Следующее занятие */}
          <div className="card stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Следующее занятие</span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(37, 99, 235, 0.15)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#60A5FA'
                }}
              >
                <Clock size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, marginTop: '2px' }}>
              {STUDENT_MOCK.nextClass.subject}
            </div>
            <div className="stat-subtext" style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">{STUDENT_MOCK.nextClass.time}</span>
              <span style={{ color: 'var(--muted)' }}>{STUDENT_MOCK.nextClass.room}</span>
            </div>
          </div>

          {/* Посещаемость */}
          <div className="card stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Посещаемость</span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#22C55E'
                }}
              >
                <Percent size={18} />
              </div>
            </div>
            <div className="stat-value" style={{ color: '#22C55E' }}>
              {STUDENT_MOCK.attendance}%
            </div>
            <div className="stat-subtext">
              Высокая дисциплина посещения лекций и лабораторий
            </div>
          </div>
        </section>

        {/* Быстрые действия */}
        <section className="card">
          <div className="card-header">
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Быстрые действия</h2>
              <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
                Оперативный переход к ключевым учебным и бытовым модулям
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px'
            }}
          >
            {[
              { title: 'Расписание', href: '/academy', icon: Calendar, color: 'var(--gold)' },
              { title: 'eGov', href: '/egov', icon: Landmark, color: '#60A5FA' },
              { title: 'Библиотека', href: '/library', icon: BookOpen, color: '#F59E0B' },
              { title: 'Market', href: '/market', icon: ShoppingBag, color: '#A78BFA' },
              { title: 'QALQAN AI', href: '/ai', icon: Bot, color: '#34D399' },
              { title: 'Поддержка', href: '/services', icon: LifeBuoy, color: 'var(--muted)' }
            ].map((act) => {
              const Icon = act.icon;
              return (
                <Link
                  key={act.title}
                  href={act.href}
                  className="button button-secondary"
                  style={{
                    height: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <Icon size={18} style={{ color: act.color }} />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{act.title}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Уведомления и Задания */}
        <section className="grid-2">
          {/* Уведомления */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={18} style={{ color: 'var(--gold)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Оперативные уведомления</h3>
              </div>
              <span className="badge badge-gold">Новые</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notifications.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--line)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '13px' }}>{item.title}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.4 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Текущие задания */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Ближайшие дедлайны</h3>
              </div>
              <Link href="/academy" style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 600 }}>
                Все задания
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-hover)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '13px' }}>Лабораторная работа №3: Сетевые пакеты</strong>
                  <span className="badge badge-warning">В работе</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                  Информационная безопасность · Срок: 25 сентября
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-hover)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '13px' }}>Расчетная работа: Дифференциальные уравнения</strong>
                  <span className="badge badge-gold">Новое</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                  Математика · Срок: 28 сентября
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 27: QALQAN Wallet (Preserving previous banking functionality with demo data) */}
        <section
          className="card"
          style={{
            border: '1px solid var(--border-gold)',
            background: 'linear-gradient(180deg, var(--surface-card) 0%, var(--surface) 100%)'
          }}
          id="qalqan-wallet-section"
        >
          <div className="card-header">
            <div>
              <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Wallet size={14} />
                Финансовый модуль
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700 }}>QALQAN Wallet</h2>
              <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
                Мультивалютные счета студента, стипендиальная карта и аналитика операций
              </p>
            </div>
            <Link href="/transfers" className="button button-primary button-sm">
              <span>Сделать перевод</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Wallet Accounts Strip */}
          <div className="grid-3" style={{ marginBottom: '24px' }}>
            {accounts.map((acc) => (
              <div
                key={acc.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius)',
                  background: acc.isPrimary ? 'var(--gold-muted)' : 'var(--surface-hover)',
                  border: acc.isPrimary ? '1px solid var(--border-gold)' : '1px solid var(--line)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: acc.isPrimary ? 'var(--gold)' : 'var(--muted)' }}>
                    {acc.currency} Wallet
                  </span>
                  {acc.isPrimary && <span className="badge badge-gold">Стипендия</span>}
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)' }}>
                  {acc.balance.toLocaleString()} {acc.currency}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                  {acc.name}
                </div>
              </div>
            ))}
          </div>

          {/* Cashflow trends chart */}
          <div style={{ marginBottom: '24px' }}>
            <SpendingChart data={analyticsData} />
          </div>

          {/* Recent Operations */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Недавние транзакции</h3>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Demo ledger</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--line)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{tx.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{tx.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '15px',
                        color: tx.amount > 0 ? '#22C55E' : 'var(--text)'
                      }}
                    >
                      {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()} {tx.currency}
                    </div>
                    <span className="badge badge-success" style={{ fontSize: '10px', marginTop: '2px' }}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
