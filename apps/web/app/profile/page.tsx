'use client';

import { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  QrCode, 
  Key, 
  Smartphone, 
  Globe, 
  Bell, 
  LogOut, 
  History, 
  Check, 
  Copy,
  Laptop
} from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { STUDENT_MOCK } from '../../lib/qalqan-data';
import { useToast } from '../../components/ui/toast-context';

export default function ProfilePage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifyStudy, setNotifyStudy] = useState(true);
  const [notifyFinance, setNotifyFinance] = useState(true);
  const [activeTab, setActiveTab] = useState<'id' | 'security' | 'settings' | 'history'>('id');
  const { showToast } = useToast();

  const handleCopyId = () => {
    navigator.clipboard?.writeText(STUDENT_MOCK.qalqanId);
    showToast('QALQAN ID скопирован в буфер обмена');
  };

  return (
    <AppShell
      eyebrow="Учетная запись"
      heading="Профиль"
      subheading="Цифровой студенческий ID, настройки безопасности учетной записи и параметры уведомлений."
    >
      {/* Navigation Tabs */}
      <div className="tabs-container" id="profile-tabs">
        <button
          onClick={() => setActiveTab('id')}
          className={`tab-btn ${activeTab === 'id' ? 'active' : ''}`}
          id="tab-profile-id"
        >
          Студенческий ID
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          id="tab-profile-sec"
        >
          Безопасность аккаунта
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          id="tab-profile-set"
        >
          Настройки
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          id="tab-profile-hist"
        >
          История действий
        </button>
      </div>

      {/* 1. СТУДЕНЧЕСКИЙ ID КАРТОЧКА */}
      {activeTab === 'id' && (
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, #111E2F 0%, #0B1422 100%)',
              border: '1px solid var(--border-gold)',
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
            }}
            id="student-id-card"
          >
            {/* Top header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)' }}>
                  Цифровой студенческий билет
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>QALQAN ID</div>
              </div>
              <span className="badge badge-gold">2026 / 2027</span>
            </div>

            {/* Profile Info Row */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '16px',
                  background: 'var(--gold-muted)',
                  border: '2px solid var(--gold)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '26px',
                  color: 'var(--gold)',
                  fontWeight: 800,
                  flexShrink: 0
                }}
              >
                АС
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>
                  {STUDENT_MOCK.name}
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--text-platinum)' }}>
                  {STUDENT_MOCK.course} · Группа {STUDENT_MOCK.group}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '2px' }}>
                  {STUDENT_MOCK.faculty}
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '12px',
                border: '1px solid var(--line)',
                marginBottom: '20px'
              }}
            >
              <div>
                <div style={{ color: 'var(--muted)' }}>Специальность:</div>
                <strong style={{ fontSize: '13px' }}>{STUDENT_MOCK.specialty}</strong>
              </div>
              <div>
                <div style={{ color: 'var(--muted)' }}>QALQAN ID:</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--gold)' }}>{STUDENT_MOCK.qalqanId}</strong>
                  <button
                    onClick={handleCopyId}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0 }}
                    title="Копировать ID"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--muted)' }}>Академический статус:</div>
                <span className="badge badge-success" style={{ marginTop: '2px' }}>Действующий курсант</span>
              </div>
              <div>
                <div style={{ color: 'var(--muted)' }}>Срок действия:</div>
                <strong>до 30.06.2029</strong>
              </div>
            </div>

            {/* QR Verification */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <QrCode size={24} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  Для валидации на турникетах и в библиотеке
                </span>
              </div>
              <button
                onClick={() => showToast('QR-код обновлен')}
                className="button button-ghost button-sm"
                style={{ fontSize: '11px' }}
              >
                Обновить токен
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. БЕЗОПАСНОСТЬ АККАУНТА */}
      {activeTab === 'security' && (
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 2FA Card */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Smartphone size={20} style={{ color: 'var(--gold)' }} />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Двухфакторная аутентификация (2FA)</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '2px' }}>
                    Защита входа через TOTP-аутентификатор
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setTwoFactorEnabled(!twoFactorEnabled);
                  showToast(twoFactorEnabled ? '2FA отключена' : '2FA успешно подключена');
                }}
                className={`button button-sm ${twoFactorEnabled ? 'button-primary' : 'button-secondary'}`}
              >
                {twoFactorEnabled ? 'Включено' : 'Выключено'}
              </button>
            </div>
          </div>

          {/* Password Change */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Key size={20} style={{ color: 'var(--gold)' }} />
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Смена пароля доступа</h3>
                <p style={{ color: 'var(--muted)', fontSize: '12px' }}>
                  Рекомендуется менять пароль не реже 1 раза в семестр
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="password" placeholder="Текущий пароль" className="input" />
              <input type="password" placeholder="Новый пароль (от 12 знаков)" className="input" />
              <button
                onClick={() => showToast('Пароль успешно обновлен')}
                className="button button-secondary"
                style={{ alignSelf: 'flex-start' }}
              >
                Обновить пароль
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
              Активные сеансы входа
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Laptop size={18} style={{ color: 'var(--gold)' }} />
                  <div>
                    <strong style={{ fontSize: '13px' }}>MacBook Pro · Chrome</strong>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Астана, Казахстан · Текущая сессия</div>
                  </div>
                </div>
                <span className="badge badge-success">Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Smartphone size={18} style={{ color: 'var(--muted)' }} />
                  <div>
                    <strong style={{ fontSize: '13px' }}>iPhone 15 · Safari</strong>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Астана, Казахстан · Вчера, 21:40</div>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Сессия завершена')}
                  className="button button-ghost button-sm"
                  style={{ color: 'var(--danger)', fontSize: '11px' }}
                >
                  Завершить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. НАСТРОЙКИ */}
      {activeTab === 'settings' && (
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Уведомления</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '14px' }}>Учебные события и расписание</strong>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Перенос занятий, новые оценки, дедлайны</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyStudy}
                  onChange={(e) => setNotifyStudy(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '14px' }}>Финансовые транзакции QALQAN Wallet</strong>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Начисление стипендии, списания в столовой</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyFinance}
                  onChange={(e) => setNotifyFinance(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Языковые параметры</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="button button-primary button-sm">Русский (RU)</button>
              <button className="button button-secondary button-sm">Қазақша (KZ)</button>
              <button className="button button-secondary button-sm">English (EN)</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ИСТОРИЯ ДЕЙСТВИЙ */}
      {activeTab === 'history' && (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Журнал аудита действий</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { event: 'Авторизация в экосистеме QALQAN', time: 'Сегодня, 08:30', ip: '10.24.11.82' },
                { event: 'Подача заявки: Справка с места учёбы', time: '20 сен 2026, 14:15', ip: '10.24.11.82' },
                { event: 'Успешное прохождение теста по кибербезопасности', time: '19 сен 2026, 16:50', ip: '10.24.11.82' },
                { event: 'Заказ товаров в QALQAN Market (№ QL-2026-00124)', time: '18 сен 2026, 11:30', ip: '10.24.11.82' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-hover)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '13px' }}>{item.event}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                      IP: {item.ip}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
