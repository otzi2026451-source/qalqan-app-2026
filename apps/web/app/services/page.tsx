'use client';

import { useState } from 'react';
import { 
  Utensils, 
  IdCard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Shield, 
  Check,
  Send,
  Coffee,
  AlertCircle
} from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { STUDENT_MOCK, DINING_MENU } from '../../lib/qalqan-data';
import { useToast } from '../../components/ui/toast-context';

interface StudentRequest {
  id: string;
  type: string;
  comment: string;
  date: string;
  status: 'Отправлено' | 'На рассмотрении' | 'Одобрено' | 'Готово';
}

const INITIAL_REQUESTS: StudentRequest[] = [
  {
    id: 'REQ-2026-041',
    type: 'Справка с места учёбы (для военкомата)',
    comment: 'С гербовой печатью в электронном виде',
    date: '20.09.2026',
    status: 'Готово'
  },
  {
    id: 'REQ-2026-052',
    type: 'Замена электронного пропуска',
    comment: 'Обновление чипа RFID',
    date: '21.09.2026',
    status: 'На рассмотрении'
  }
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'dining' | 'pass' | 'requests'>('dining');
  const [mealBalance, setMealBalance] = useState<number>(14500);
  const [requests, setRequests] = useState<StudentRequest[]>(INITIAL_REQUESTS);
  const [requestType, setRequestType] = useState('Справка с места учёбы');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleOrderMeal = (mealName: string, price: number) => {
    if (mealBalance < price) {
      showToast('Недостаточно средств на балансе питания', 'error');
      return;
    }
    setMealBalance((prev) => prev - price);
    showToast(`Комплекс «${mealName}» оплачен. Списано ${price} ₸`);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Пожалуйста, укажите описание заявки', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newReq: StudentRequest = {
        id: `REQ-2026-0${Math.floor(60 + Math.random() * 40)}`,
        type: requestType,
        comment,
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'Отправлено'
      };
      setRequests([newReq, ...requests]);
      setComment('');
      setIsSubmitting(false);
      showToast(`Заявка ${newReq.id} успешно отправлена в деканат`);
    }, 400);
  };

  return (
    <AppShell
      eyebrow="Бытовая инфраструктура"
      heading="Сервисы"
      subheading="Столовая и горячее питание, электронный кампусный пропуск и подача официальных заявок."
    >
      {/* Navigation Tabs */}
      <div className="tabs-container" id="services-tabs">
        <button
          onClick={() => setActiveTab('dining')}
          className={`tab-btn ${activeTab === 'dining' ? 'active' : ''}`}
          id="tab-dining"
        >
          Столовая и питание
        </button>
        <button
          onClick={() => setActiveTab('pass')}
          className={`tab-btn ${activeTab === 'pass' ? 'active' : ''}`}
          id="tab-pass"
        >
          Пропуск и доступ
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          id="tab-requests"
        >
          Подача заявок ({requests.length})
        </button>
      </div>

      {/* 1. СТОЛОВАЯ */}
      {activeTab === 'dining' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Balance card */}
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, var(--surface-card) 0%, rgba(197, 160, 89, 0.1) 100%)',
              border: '1px solid var(--border-gold)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Utensils size={14} />
                  Лицевой счёт питания
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gold)' }}>
                  {mealBalance.toLocaleString()} ₸
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                  Субсидия начисляется 1-го числа каждого месяца
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setMealBalance((b) => b + 5000);
                    showToast('Баланс питания пополнен на 5 000 ₸');
                  }}
                  className="button button-primary button-sm"
                >
                  <Plus size={14} />
                  <span>Пополнить счёт</span>
                </button>
              </div>
            </div>
          </div>

          {/* Меню дня */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Меню дня (Комплексные рационы)</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Горячее питание курсантов сбалансировано по КБЖУ</p>
              </div>
              <span className="badge badge-gold">Завтрак · Обед · Ужин</span>
            </div>

            <div className="grid-3">
              {DINING_MENU.map((item) => (
                <div
                  key={item.id}
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-gold">{item.type}</span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.calories}</span>
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{item.name}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px' }}>
                      {item.description}
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
                    <strong style={{ fontSize: '16px', color: 'var(--gold)' }}>
                      {item.price.toLocaleString()} ₸
                    </strong>
                    <button
                      onClick={() => handleOrderMeal(item.name, item.price)}
                      className="button button-secondary button-sm"
                    >
                      Оплатить обед
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ПРОПУСК / ДОСТУП */}
      {activeTab === 'pass' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-2">
            {/* Campus Pass Card */}
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, #111E2F 0%, #0B1422 100%)',
                border: '1px solid var(--border-gold)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)' }}>
                    QALQAN Smart Access
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>Электронный пропуск</h3>
                </div>
                <span className="badge badge-success">
                  <Check size={12} />
                  Статус: Активен
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    background: 'var(--gold-muted)',
                    border: '2px solid var(--gold)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '24px',
                    color: 'var(--gold)',
                    fontWeight: 800
                  }}
                >
                  АС
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>{STUDENT_MOCK.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    ID: QL-2026-9941 · Группа {STUDENT_MOCK.group}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '4px' }}>
                    Слушатель 1 курса
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>
                  Разрешенные зоны доступа:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-gold">Корпус A</span>
                  <span className="badge badge-gold">Корпус B</span>
                  <span className="badge badge-gold">Библиотека</span>
                  <span className="badge badge-gold">Спорткомплекс</span>
                </div>
              </div>
            </div>

            {/* Access Logs */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Журнал проходов (СКУД)</h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Сегодня</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { point: 'КПП Главный въезд / Турникет 2', time: '08:12', type: 'Вход' },
                  { point: 'Корпус B · IT-лаборатория №402', time: '08:45', type: 'Проход' },
                  { point: 'Столовая Академии · Турникет', time: '13:05', type: 'Вход' }
                ].map((log, idx) => (
                  <div
                    key={idx}
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
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{log.point}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{log.time}</div>
                    </div>
                    <span className="badge badge-muted">{log.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ЗАЯВКИ */}
      {activeTab === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Submission Form */}
          <div className="card" style={{ maxWidth: '680px' }}>
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Подача новой заявки</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
                  Запрос поступает куратору курса и в единую канцелярию
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateRequest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Тип заявки
                </label>
                <select
                  className="select"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                >
                  <option value="Справка с места учёбы">Справка с места учёбы (по месту требования)</option>
                  <option value="Пропуск и СКУД">Замена или перевыпуск пропуска</option>
                  <option value="Общежитие">Заселение / смена комнаты в общежитии</option>
                  <option value="Техническая проблема">Техническая проблема в учебной аудитории</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Комментарий и детали заявки
                </label>
                <textarea
                  className="textarea"
                  rows={3}
                  placeholder="Укажите причину обращения или необходимые формулировки..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary"
                  style={{ gap: '6px' }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Отправка...' : 'Отправить заявку'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Requests List */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>
              История поданных заявок
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {requests.map((r) => {
                const getStatusBadge = (status: string) => {
                  switch (status) {
                    case 'Готово': return 'badge-success';
                    case 'Одобрено': return 'badge-success';
                    case 'На рассмотрении': return 'badge-warning';
                    default: return 'badge-gold';
                  }
                };
                return (
                  <div
                    key={r.id}
                    className="card"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className={`badge ${getStatusBadge(r.status)}`}>{r.status}</span>
                        <span style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 700 }}>{r.id}</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>от {r.date}</span>
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700 }}>{r.type}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>{r.comment}</p>
                    </div>
                    <span className="badge badge-muted">Канцелярия</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
