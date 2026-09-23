# Architecture Blueprint

## Folder structure

```text
apps/
  api/
    prisma/
      schema.prisma           # database schema
      seed.ts                 # demo data: users, rates, 1200+ transactions
    src/
      auth/                   # register, login, refresh, 2FA
      users/                  # profile APIs
      accounts/               # balances and portfolio summary
      transactions/           # top-up, withdraw, transfer, limits, fraud flags
      fx/                     # exchange rates and conversion
      notifications/          # in-app notifications
      admin/                  # admin-only reporting and review queues
      common/                 # decorators and guards
      database/               # Prisma service/module
  web/
    app/
      page.tsx                # marketing landing
      login/                  # auth entry
      dashboard/              # main banking dashboard
      transfers/              # mobile-first transfer flow
      admin/                  # admin panel shell
    components/
      charts/                 # lazy-friendly charts
      layout/                 # shared shell + mobile tab bar
      pwa/                    # service worker registration
    public/
      manifest.json           # PWA metadata
      sw.js                   # offline shell cache
legacy/
  index.html, css/, js/       # original prototype preserved
```

## Banking domain

- `User` owns multiple currency accounts.
- `Account` stores current balance and per-day debit/credit limits.
- `Transaction` stores source/target accounts, amount, status and suspicious flags.
- `FxRate` stores cached exchange rates.
- `Notification` powers in-app alerts and is extensible to email/push jobs.
- `AuditLog` stores important user/admin actions.

## Security model

- Access token: short-lived bearer JWT.
- Refresh token: long-lived, rotated, stored as bcrypt hash in DB.
- 2FA: TOTP secret per user, enabled after verification.
- CSRF: refresh endpoint expects cookie + header token pair.
- XSS: React escaping + helmet + strict DTO validation.
- SQL injection: Prisma typed queries, no string-built SQL in critical flows.

## Mobile-first UX

- Bottom tab bar for primary actions.
- Larger tap targets and condensed account cards.
- Lightweight first screen with server-rendered critical data.
- PWA installation and offline app shell.
- Push-ready architecture via service worker.

## Scale path

For the next stage, split into:

1. `packages/contracts` for shared DTO/types.
2. Redis-backed queues for notifications/fraud checks.
3. Kafka or NATS for ledger events.
4. Dedicated ledger service for immutable accounting entries.
