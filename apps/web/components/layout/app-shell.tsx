'use client';

import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { MobileTabBar } from './mobile-tabbar';
import { ToastProvider } from '../ui/toast-context';

export function AppShell({
  children,
  heading,
  subheading,
  eyebrow,
  action
}: {
  children: ReactNode;
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <ToastProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div style={{ flex: 1 }}>
          {(heading || eyebrow) && (
            <div
              style={{
                borderBottom: '1px solid var(--line)',
                background: 'var(--surface)',
                padding: '28px 20px',
                marginBottom: '28px'
              }}
            >
              <div
                style={{
                  maxWidth: '1280px',
                  margin: '0 auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  {eyebrow && <div className="eyebrow">{eyebrow}</div>}
                  {heading && <h1 className="page-title">{heading}</h1>}
                  {subheading && <p className="page-subtitle">{subheading}</p>}
                </div>
                {action && <div style={{ alignSelf: 'center' }}>{action}</div>}
              </div>
            </div>
          )}

          <div className="shell">{children}</div>
        </div>

        <Footer />
        <MobileTabBar />
      </div>
    </ToastProvider>
  );
}
