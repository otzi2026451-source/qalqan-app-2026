'use client';

import { useState, FormEvent } from 'react';
import { Send, ShieldCheck, ArrowRight, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '../ui/toast-context';

export function TransferDemo() {
  const [fromAccount, setFromAccount] = useState('KZT');
  const [recipient, setRecipient] = useState('+7 (777) 234-56-78 (Ерлан К.)');
  const [amount, setAmount] = useState('15000');
  const [note, setNote] = useState('Возврат за учебные материалы');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { showToast } = useToast();

  const handleTransfer = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      showToast('Укажите корректную сумму перевода', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      showToast(`Перевод ${Number(amount).toLocaleString()} ₸ успешно отправлен`);
    }, 600);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      {/* Form Panel */}
      <section className="card">
        <div className="card-header">
          <div>
            <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Send size={13} />
              QALQAN Wallet
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Быстрый перевод</h2>
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
              Беспроцентные внутренние переводы между счетами и сокурсниками
            </p>
          </div>
        </div>

        {!isDone ? (
          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Счёт списания
              </label>
              <select
                className="select"
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
              >
                <option value="KZT">Основной счёт (KZT) · Баланс: 1 280 450 ₸</option>
                <option value="USD">Валютный кошелёк (USD) · Баланс: $2,430</option>
                <option value="EUR">Валютный кошелёк (EUR) · Баланс: €1,180</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Получатель (Номер телефона или QALQAN ID)
              </label>
              <input
                type="text"
                className="input"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Сумма ({fromAccount})
              </label>
              <input
                type="number"
                className="input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                min="100"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Назначение / Сообщение
              </label>
              <input
                type="text"
                className="input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Укажите комментарий"
              />
            </div>

            <div style={{ paddingTop: '8px' }}>
              <button
                type="submit"
                disabled={isProcessing}
                className="button button-primary"
                style={{ width: '100%', gap: '8px' }}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw size={16} className="spin-animation" />
                    <span>Подтверждение через QALQAN 2FA...</span>
                  </>
                ) : (
                  <>
                    <span>Подтвердить перевод</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#22C55E',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px'
              }}
            >
              <Check size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Перевод исполнен</h3>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gold)', margin: '8px 0' }}>
              {Number(amount).toLocaleString()} {fromAccount}
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '20px' }}>
              Получатель: <strong>{recipient}</strong><br />
              Комиссия: <strong>0 ₸</strong> · Чек сохранён в выписке
            </p>
            <button
              onClick={() => setIsDone(false)}
              className="button button-secondary"
            >
              Сделать ещё один перевод
            </button>
          </div>
        )}
      </section>

      {/* Aside Risk & Limits Panel */}
      <section className="card" style={{ height: 'fit-content' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <ShieldCheck size={20} style={{ color: 'var(--gold)' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Лимиты и безопасность</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
          <div style={{ padding: '10px 12px', background: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ color: 'var(--muted)', fontSize: '11px' }}>Дневной лимит переводов:</div>
            <strong style={{ fontSize: '14px' }}>500 000 ₸</strong>
            <div style={{ fontSize: '11px', color: '#22C55E', marginTop: '2px' }}>Осталось сегодня: 485 000 ₸</div>
          </div>

          <div style={{ padding: '10px 12px', background: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ color: 'var(--muted)', fontSize: '11px' }}>Комиссия внутри экосистемы:</div>
            <strong style={{ fontSize: '14px', color: 'var(--gold)' }}>0% (Без комиссии)</strong>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>
            <AlertCircle size={15} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
            <span>
              Все операции валидируются системой фрод-мониторинга. При подозрительной активности перевод временно блокируется до подтверждения в деканате.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
