import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async overview() {
    const [users, transactions, flaggedTransactions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.transaction.count(),
      this.prisma.transaction.count({ where: { status: 'FLAGGED' } })
    ]);

    return {
      users,
      transactions,
      flaggedTransactions
    };
  }

  async usersList() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { accounts: true }
    });
  }

  async flaggedTransactionsList() {
    return this.prisma.transaction.findMany({
      where: { status: 'FLAGGED' },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
  }
}
