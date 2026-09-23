'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ShieldCheck, ArrowRight, User, Lock, Smartphone, Check } from 'lucide-react';
import { QalqanLogo } from '../layout/qalqan-logo';

export function LoginDemoForm() {
  const router = useRouter();
  const [email, setEmail] = useState('student@qalqan.demo');
  const [password, setPassword] = useState('Qalqan2026!');
  const [code, setCode] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    }, 500);
  };

  const handleFillDemo = () => {
    setEmail('student@qalqan.demo');
    setPassword('Qalqan2026!');
    setCode('123456');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'grid',
        placeItems: 'center',
        padding: '16px'
      }}
      id="login-page-container"
    >
      <div
        className="card"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '36px',
          border: '1px solid var(--border-gold)',
          background: 'var(--surface-card)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-block', marginBottom: '14px' }}>
            <QalqanLogo size="large" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, marginTop: '8px' }}>
            Вход в экосистему
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
            Единая точка авторизации для курсантов и преподавателей
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#22C55E',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px'
              }}
            >
              <Check size={30} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Успешная авторизация</h3>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '6px' }}>
              Переход в Моё пространство...
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                QALQAN ID или Email
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                <input
                  type="text"
                  className="input"
                  style={{ paddingLeft: '38px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@qalqan.demo"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Пароль
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                <input
                  type="password"
                  className="input"
                  style={{ paddingLeft: '38px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Одноразовый код 2FA (TOTP)
              </label>
              <div style={{ position: 'relative' }}>
                <Smartphone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} />
                <input
                  type="text"
                  className="input"
                  style={{ paddingLeft: '38px' }}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '8px' }}>
              <button
                type="submit"
                disabled={loading}
                className="button button-primary"
                style={{ width: '100%', gap: '8px' }}
                id="login-submit-btn"
              >
                <span>{loading ? 'Проверка...' : 'Войти в систему'}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ background: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Demo-данные для входа:</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Заполнить
                </button>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-platinum)', marginTop: '4px' }}>
                ID: <strong>student@qalqan.demo</strong> · Пароль: <strong>Qalqan2026!</strong>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <Link href="/" style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Вернуться на главную
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
