'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Smartphone, 
  Wifi, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award,
  AlertTriangle
} from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { SECURITY_QUIZ, QuizQuestion } from '../../lib/qalqan-data';
import { useToast } from '../../components/ui/toast-context';

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'tips' | 'quiz' | 'rules'>('quiz');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const { showToast } = useToast();

  const currentQuestion = SECURITY_QUIZ[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestionIdx + 1 < SECURITY_QUIZ.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
      showToast('Тестирование по кибербезопасности завершено');
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  const correctAnswersCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === SECURITY_QUIZ[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <AppShell
      eyebrow="Кибергигиена и защита данных"
      heading="Цифровая безопасность"
      subheading="Осведомленность о сетевых угрозах, правила цифровой дисциплины и практический тест на киберграмотность."
    >
      {/* Navigation Tabs */}
      <div className="tabs-container" id="security-tabs">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          id="tab-security-quiz"
        >
          Тест по кибербезопасности
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
          id="tab-security-tips"
        >
          Кибергигиена
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
          id="tab-security-rules"
        >
          Памятка курсанта
        </button>
      </div>

      {/* 1. QUIZ SECTION */}
      {activeTab === 'quiz' && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {!isQuizCompleted ? (
            <div className="card" id="quiz-active-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-gold">
                  Вопрос {currentQuestionIdx + 1} из {SECURITY_QUIZ.length}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Тест на знание киберугроз
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '6px', background: 'var(--surface-hover)', borderRadius: '3px', marginBottom: '24px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'var(--gold)',
                    width: `${((currentQuestionIdx + 1) / SECURITY_QUIZ.length) * 100}%`,
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.4 }}>
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className="button button-secondary button-multiline"
                      style={{
                        padding: '14px 16px',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        minHeight: 'auto',
                        lineHeight: 1.4,
                        background: isSelected ? 'var(--gold-muted)' : 'var(--surface-hover)',
                        borderColor: isSelected ? 'var(--gold)' : 'var(--line)',
                        color: isSelected ? 'var(--gold)' : 'var(--text)'
                      }}
                      id={`quiz-option-${idx}`}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: isSelected ? 'var(--gold)' : 'var(--surface)',
                          color: isSelected ? '#0B1422' : 'var(--muted)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                          marginRight: '12px',
                          flexShrink: 0
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="button button-primary"
                  id="quiz-next-btn"
                >
                  {currentQuestionIdx + 1 === SECURITY_QUIZ.length ? 'Завершить тест' : 'Следующий вопрос'}
                </button>
              </div>
            </div>
          ) : (
            /* Results Breakdown */
            <div className="card" id="quiz-results-card">
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: correctAnswersCount >= 4 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                    color: correctAnswersCount >= 4 ? '#22C55E' : 'var(--gold)',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Award size={32} />
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Результаты тестирования</h2>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--gold)', margin: '8px 0' }}>
                  {correctAnswersCount} из {SECURITY_QUIZ.length} баллов
                </div>
                <p style={{ color: 'var(--text-platinum)', fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>
                  {correctAnswersCount === 5
                    ? 'Превосходно! Вы продемонстрировали образцовую цифровую дисциплину и устойчивость к социальной инженерии.'
                    : correctAnswersCount >= 3
                    ? 'Хороший результат. Рекомендуем повторить правила работы с публичными сетями и фишингом.'
                    : 'Внимание! Рекомендуется внимательно изучить памятку по кибергигиене во избежание утечки учетных данных.'}
                </p>
              </div>

              {/* Answers Review */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Разбор ответов:</h3>
                {SECURITY_QUIZ.map((q, idx) => {
                  const userAnswer = userAnswers[idx];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--surface-hover)',
                        border: isCorrect ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        {isCorrect ? (
                          <CheckCircle2 size={16} style={{ color: '#22C55E' }} />
                        ) : (
                          <XCircle size={16} style={{ color: 'var(--danger)' }} />
                        )}
                        <strong style={{ fontSize: '14px' }}>Вопрос {idx + 1}: {q.question}</strong>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                        Ваш ответ: <em>{q.options[userAnswer]}</em>
                      </div>
                      {!isCorrect && (
                        <div style={{ fontSize: '13px', color: 'var(--gold)', marginTop: '2px' }}>
                          Правильный ответ: <strong>{q.options[q.correctIndex]}</strong>
                        </div>
                      )}
                      <div style={{ fontSize: '12px', color: 'var(--text-platinum)', marginTop: '8px', padding: '8px', background: 'var(--surface)', borderRadius: '6px' }}>
                        💡 <strong>Пояснение:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleRestartQuiz} className="button button-primary" style={{ gap: '8px' }}>
                  <RotateCcw size={16} />
                  <span>Пройти тест заново</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. КИБЕРГИГИЕНА */}
      {activeTab === 'tips' && (
        <div className="grid-2">
          {[
            {
              title: 'Надёжные пароли и фразы',
              icon: Lock,
              text: 'Используйте пароли длиной от 14–16 символов, состоящие из произвольных слов, цифр и спецсимволов. Никогда не используйте один и тот же пароль для учебного портала, личной почты и банковских сервисов.'
            },
            {
              title: 'Распознавание фишинга',
              icon: Mail,
              text: 'Проверяйте доменные имена сайтов и адрес отправителя. Официальные уведомления Академии никогда не требуют срочного перехода по подозрительным ссылкам для «подтверждения пароля» или скачивания архивов.'
            },
            {
              title: 'Двухфакторная аутентификация (2FA)',
              icon: Smartphone,
              text: 'Включайте аппаратные ключи или приложения-генераторы одноразовых кодов (TOTP: Google Authenticator, FreeOTP). SMS-сообщения уязвимы к перехвату и подмене SIM-карт.'
            },
            {
              title: 'Публичные Wi-Fi сети',
              icon: Wifi,
              text: 'В публичных местах (кафе, вокзалы, торговые центры) трафик незащищенных Wi-Fi сетей может перехватываться. Используйте шифрованный корпоративный туннель или мобильный интернет.'
            }
          ].map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div key={idx} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--gold-muted)',
                      color: 'var(--gold)',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{tip.title}</h3>
                </div>
                <p style={{ color: 'var(--text-platinum)', fontSize: '14px', lineHeight: 1.6 }}>
                  {tip.text}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. ПАМЯТКА КУРСАНТУ */}
      {activeTab === 'rules' && (
        <div className="card" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '20px' }}>
            <ShieldCheck size={28} style={{ color: 'var(--gold)' }} />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Кодекс цифровой дисциплины курсанта</h2>
              <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
                Обязательные требования при работе с учебной вычислительной техникой и личными устройствами
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="badge badge-gold" style={{ flexShrink: 0, marginTop: '2px' }}>Правило 1</span>
              <div>
                <strong>Блокировка экрана (Win + L / Cmd + Ctrl + Q):</strong> Покидая рабочее место в аудитории или лаборатории даже на минуту, обязательно блокируйте терминал.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="badge badge-gold" style={{ flexShrink: 0, marginTop: '2px' }}>Правило 2</span>
              <div>
                <strong>Внешние носители информации:</strong> Запрещается подключение непроверенных USB-накопителей к лабораторным компьютерам без предварительной проверки антивирусным шлюзом.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="badge badge-gold" style={{ flexShrink: 0, marginTop: '2px' }}>Правило 3</span>
              <div>
                <strong>Защита учетных записей:</strong> Передача логинов и паролей сокурсникам или третьим лицам категорически запрещена и является грубым нарушением регламента.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="badge badge-gold" style={{ flexShrink: 0, marginTop: '2px' }}>Правило 4</span>
              <div>
                <strong>Реагирование на инциденты:</strong> При обнаружении признаков несанкционированного доступа, сбоев сетевых экранов или подозрительной активности немедленно уведомляйте дежурного инженера кафедры.
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
