'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export function SpendingChart({
  data
}: {
  data: Array<{ month: string; income: number; spending: number }>;
}) {
  return (
    <div className="chart-card">
      <div className="section-head">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>Cashflow trends</h2>
        </div>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.18)" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#incomeGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="spending" stroke="#f97316" fill="url(#spendingGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
