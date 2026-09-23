'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Award, 
  CheckSquare, 
  FileText, 
  Clock, 
  MapPin, 
  User, 
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { 
  SCHEDULE_MOCK, 
  GRADES_MOCK, 
  ASSIGNMENTS_MOCK, 
  EXAMS_MOCK, 
  STUDENT_MOCK 
} from '../../lib/qalqan-data';

export default function AcademyPage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'grades' | 'assignments' | 'exams'>('schedule');
  const [selectedDay, setSelectedDay] = useState<string>('Все');
  const [assignmentFilter, setAssignmentFilter] = useState<string>('Все');

  const days = ['Все', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const filteredSchedule = selectedDay === 'Все'
    ? SCHEDULE_MOCK
    : SCHEDULE_MOCK.filter((s) => s.day === selectedDay);

  const filteredAssignments = assignmentFilter === 'Все'
    ? ASSIGNMENTS_MOCK
    : ASSIGNMENTS_MOCK.filter((a) => a.status === assignmentFilter);

  return (
    <AppShell
      eyebrow="Учебный процесс"
      heading="Академия"
      subheading="Расписание учебных занятий, текущая и рубежная успеваемость, лабораторные задания и график экзаменационной сессии."
    >
      {/* Navigation Tabs */}
      <div className="tabs-container" id="academy-tabs">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          id="tab-schedule"
        >
          Расписание занятий
        </button>
        <button
          onClick={() => setActiveTab('grades')}
          className={`tab-btn ${activeTab === 'grades' ? 'active' : ''}`}
          id="tab-grades"
        >
          Успеваемость и баллы
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
          id="tab-assignments"
        >
          Задания ({ASSIGNMENTS_MOCK.length})
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`}
          id="tab-exams"
        >
          Экзаменационная сессия
        </button>
      </div>

      {/* 1. РАСПИСАНИЕ */}
      {activeTab === 'schedule' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Day Filters */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`button button-sm ${selectedDay === day ? 'button-primary' : 'button-secondary'}`}
                style={{ fontSize: '13px' }}
              >
                {day}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredSchedule.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--gold-muted)',
                      color: 'var(--gold)',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 700,
                      fontSize: '13px',
                      textAlign: 'center',
                      lineHeight: 1.1
                    }}
                  >
                    {item.day.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-gold">{item.type}</span>
                      <span style={{ fontSize: '13px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} />
                        {item.time}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{item.subject}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', display: 'flex', gap: '12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} />
                        {item.room}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <User size={13} />
                        {item.instructor}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="badge badge-muted">IS-101</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. УСПЕВАЕМОСТЬ */}
      {activeTab === 'grades' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Summary Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--surface-card) 0%, rgba(197, 160, 89, 0.1) 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="eyebrow">Академический статус</span>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Сводная ведомость 1 семестра</h2>
                <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                  Курсант: {STUDENT_MOCK.name} · Группа {STUDENT_MOCK.group}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>GPA / Рейтинг</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gold)' }}>{STUDENT_MOCK.gpa}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Всего кредитов</div>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>20 ECTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--line)' }}>
                    <th style={{ padding: '14px 18px', fontWeight: 600 }}>Дисциплина</th>
                    <th style={{ padding: '14px 18px', fontWeight: 600 }}>Кредиты</th>
                    <th style={{ padding: '14px 18px', fontWeight: 600 }}>Текущий балл</th>
                    <th style={{ padding: '14px 18px', fontWeight: 600 }}>Рубежный контроль</th>
                    <th style={{ padding: '14px 18px', fontWeight: 600 }}>Итоговый балл</th>
                    <th style={{ padding: '14px 18px', fontWeight: 600 }}>Буквенная оценка</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADES_MOCK.map((g) => (
                    <tr key={g.subject} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>{g.subject}</td>
                      <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>{g.credits} ECTS</td>
                      <td style={{ padding: '14px 18px' }}>{g.currentScore} / 100</td>
                      <td style={{ padding: '14px 18px' }}>{g.midterm} / 100</td>
                      <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--gold)' }}>{g.total}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <span className="badge badge-gold" style={{ fontWeight: 800 }}>
                          {g.gradeLetter}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. ЗАДАНИЯ */}
      {activeTab === 'assignments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status Filters */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Все', 'Новое', 'В работе', 'Выполнено'].map((status) => (
              <button
                key={status}
                onClick={() => setAssignmentFilter(status)}
                className={`button button-sm ${assignmentFilter === status ? 'button-primary' : 'button-secondary'}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredAssignments.map((task) => (
              <div
                key={task.id}
                className="card"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      className={`badge ${
                        task.status === 'Выполнено'
                          ? 'badge-success'
                          : task.status === 'В работе'
                          ? 'badge-warning'
                          : 'badge-gold'
                      }`}
                    >
                      {task.status}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{task.subject}</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{task.title}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                    Срок сдачи: {task.dueDate} {task.score && `· Оценка: ${task.score}`}
                  </div>
                </div>

                <div>
                  <button className="button button-secondary button-sm">
                    {task.status === 'Выполнено' ? 'Просмотр работы' : 'Сдать материал'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ЭКЗАМЕНЫ */}
      {activeTab === 'exams' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ background: 'var(--surface-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} style={{ color: 'var(--gold)' }} />
              <div>
                <strong style={{ fontSize: '14px' }}>Зимняя экзаменационная сессия 2026</strong>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                  Допуск к экзаменам формируется при сумме баллов текущего и рубежного контроля не менее 50.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {EXAMS_MOCK.map((exam) => (
              <div key={exam.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
                      {exam.date} · {exam.time}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{exam.subject}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', display: 'flex', gap: '12px' }}>
                      <span>Аудитория: {exam.room}</span>
                      <span>·</span>
                      <span>Формат: {exam.format}</span>
                    </div>
                  </div>
                  <span className="badge badge-success">Допуск подтвержден</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
