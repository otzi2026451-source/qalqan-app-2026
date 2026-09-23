import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  getAccounts(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: { currency: 'asc' }
    });
  }

  async getPortfolioSummary(userId: string) {
    const [accounts, recentTransactions] = await Promise.all([
      this.getAccounts(userId),
      this.prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 8
      })
    ]);

    return {
      accounts,
      recentTransactions,
      totals: {
        totalAccounts: accounts.length,
        totalBalance: accounts.reduce((sum, account) => sum + Number(account.balance), 0)
      }
    };
  }
}
