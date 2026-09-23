const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export type Account = {
  id: string;
  currency: 'KZT' | 'USD' | 'EUR';
  balance: number;
  isPrimary?: boolean;
};

export type Transaction = {
  id: string;
  type: string;
  status: 'SUCCESS' | 'FLAGGED' | 'PENDING' | 'FAILED';
  amount: number;
  currency: string;
  description?: string | null;
  createdAt: string;
  flaggedReason?: string | null;
};

export async function getDashboardSnapshot() {
  // В демо-режиме возвращаем сервероподобный срез, чтобы UI был заполнен
  return {
    customer: {
      name: 'Aruzhan Ilyassova',
      tier: 'Premium',
      role: 'USER'
    },
    accounts: [
      { id: 'acc-kzt', currency: 'KZT', balance: 1280450, isPrimary: true },
      { id: 'acc-usd', currency: 'USD', balance: 2430 },
      { id: 'acc-eur', currency: 'EUR', balance: 1180 }
    ] satisfies Account[],
    rates: [
      { pair: 'USD/KZT', rate: 476.4 },
      { pair: 'EUR/KZT', rate: 512.7 },
      { pair: 'USD/EUR', rate: 0.92 }
    ],
    notifications: [
      { id: 'n1', title: 'Push enabled', body: 'Critical alerts will appear on your phone.' },
      { id: 'n2', title: 'Transfer review', body: 'One large transfer was flagged for analyst review.' }
    ],
    transactions: [
      { id: 'tx1', type: 'TRANSFER', status: 'SUCCESS', amount: 245000, currency: 'KZT', description: 'Rent payment', createdAt: new Date().toISOString() },
      { id: 'tx2', type: 'WITHDRAWAL', status: 'SUCCESS', amount: 50000, currency: 'KZT', description: 'ATM withdrawal', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 'tx3', type: 'TRANSFER', status: 'FLAGGED', amount: 790000, currency: 'KZT', description: 'Vendor payout', createdAt: new Date(Date.now() - 172800000).toISOString(), flaggedReason: 'Large transfer over threshold' }
    ] satisfies Transaction[],
    analytics: [
      { month: 'Nov', income: 720000, spending: 430000 },
      { month: 'Dec', income: 680000, spending: 392000 },
      { month: 'Jan', income: 840000, spending: 510000 },
      { month: 'Feb', income: 790000, spending: 468000 },
      { month: 'Mar', income: 880000, spending: 544000 },
      { month: 'Apr', income: 910000, spending: 563000 }
    ]
  };
}

export { API_URL };
