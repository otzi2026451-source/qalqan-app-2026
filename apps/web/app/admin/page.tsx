import { AppShell } from '../../components/layout/app-shell';
import { ShieldCheck, Users, Activity, AlertCircle } from 'lucide-react';

const users = [
  { id: 'u1', name: 'Аян Сейітов (IS-101)', risk: 'Норма', status: 'Активен', score: '91.4' },
  { id: 'u2', name: 'Нурлан Ахметов (IS-101)', risk: 'Внимание', status: 'Пропуск рубежного', score: '58.0' },
  { id: 'u3', name: 'Данияр Омаров (IS-102)', risk: 'Норма', status: 'Активен', score: '88.5' }
];

export default function AdminPage() {
  return (
    <AppShell
      eyebrow="Административный контур"
      heading="Панель куратора курса"
      subheading="Мониторинг академического статуса групп, посещаемости и заявок курсантов."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <section className="grid-3">
          <div className="card stat-card">
            <span className="stat-label">Всего курсантов в потоке</span>
            <div className="stat-value" style={{ color: 'var(--gold)' }}>124</div>
            <div className="stat-subtext">Поток 1 курса (Кафедра ИБ)</div>
          </div>
          <div className="card stat-card">
            <span className="stat-label">Средняя посещаемость</span>
            <div className="stat-value" style={{ color: '#22C55E' }}>94.2%</div>
            <div className="stat-subtext">Выше планового показателя</div>
          </div>
          <div className="card stat-card">
            <span className="stat-label">Заявки в обработке</span>
            <div className="stat-value" style={{ color: '#F59E0B' }}>3</div>
            <div className="stat-subtext">Справки и запросы СКУД</div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Академический мониторинг курсантов</h2>
              <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Контроль успеваемости и допуска к зимней сессии</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {users.map((u) => (
              <div
                key={u.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--line)'
                }}
              >
                <div>
                  <strong style={{ fontSize: '14px' }}>{u.name}</strong>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                    Статус: {u.status} · Текущий рейтинг: {u.score}
                  </div>
                </div>
                <span className={`badge ${u.risk === 'Норма' ? 'badge-success' : 'badge-warning'}`}>
                  {u.risk}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
