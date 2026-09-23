import { AccountCurrency, PrismaClient, TransactionStatus, TransactionType, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const currencies = [AccountCurrency.KZT, AccountCurrency.USD, AccountCurrency.EUR];

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.fxRate.deleteMany();

  const passwordHash = await bcrypt.hash('DemoBank123!', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@ilyasbank.demo',
      fullName: 'Platform Admin',
      passwordHash,
      twoFactorSecret: 'ADMINSECRET',
      twoFactorEnabled: true,
      role: UserRole.ADMIN
    }
  });

  const users = await Promise.all(
    Array.from({ length: 12 }).map((_, index) =>
      prisma.user.create({
        data: {
          email: `client${index + 1}@ilyasbank.demo`,
          fullName: `Client ${index + 1}`,
          passwordHash,
          twoFactorSecret: `SECRET${index + 1}`,
          twoFactorEnabled: index % 2 === 0,
          phone: `+7700${String(index).padStart(6, '0')}`,
          accounts: {
            create: currencies.map((currency, currencyIndex) => ({
              currency,
              balance: currency === AccountCurrency.KZT ? 250000 + index * 10000 : 500 + currencyIndex * 200,
              dailyDebitLimit: currency === AccountCurrency.KZT ? 900000 : 5000,
              dailyCreditLimit: currency === AccountCurrency.KZT ? 900000 : 5000,
              isPrimary: currency === AccountCurrency.KZT
            }))
          }
        },
        include: { accounts: true }
      })
    )
  );

  await prisma.account.createMany({
    data: [
      {
        userId: admin.id,
        currency: AccountCurrency.KZT,
        balance: 0,
        dailyDebitLimit: 0,
        dailyCreditLimit: 0,
        isPrimary: true
      }
    ]
  });

  await prisma.fxRate.createMany({
    data: [
      { base: 'KZT', quote: 'USD', rate: 0.0021 },
      { base: 'USD', quote: 'KZT', rate: 476.4 },
      { base: 'KZT', quote: 'EUR', rate: 0.0019 },
      { base: 'EUR', quote: 'KZT', rate: 512.7 },
      { base: 'USD', quote: 'EUR', rate: 0.92 },
      { base: 'EUR', quote: 'USD', rate: 1.08 }
    ]
  });

  const allAccounts = users.flatMap((user) => user.accounts);

  const transactions = Array.from({ length: 1200 }).map((_, index) => {
    const source = allAccounts[index % allAccounts.length];
    const target = allAccounts[(index + 5) % allAccounts.length];
    const amount = (index % 25 === 0 ? 780000 : 8000 + (index % 17) * 3200);
    const createdAt = new Date(Date.now() - index * 3_600_000);

    return {
      userId: source.userId,
      sourceAccountId: source.id,
      targetAccountId: target.id,
      type: TransactionType.TRANSFER,
      status: amount > 700000 ? TransactionStatus.FLAGGED : TransactionStatus.SUCCESS,
      amount,
      currency: source.currency,
      description: `Seeded payment #${index + 1}`,
      flaggedReason: amount > 700000 ? 'Large transfer over threshold' : null,
      createdAt
    };
  });

  for (const chunk of chunkArray(transactions, 200)) {
    await prisma.transaction.createMany({ data: chunk });
  }

  for (const user of users.slice(0, 8)) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        channel: 'IN_APP',
        title: 'Welcome to ILYAS BANK 2.0',
        body: 'Your mobile dashboard, transfers and alerts are ready.'
      }
    });
  }
}

function chunkArray<T>(array: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }
  return chunks;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
