import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma, TransactionStatus, TransactionType } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CashOperationDto } from './dto/cash-operation.dto';
import { CreateTransferDto } from './dto/create-transfer.dto';

const DAILY_TRANSFER_LIMIT = 1_500_000;
const LARGE_TRANSFER_THRESHOLD = 700_000;

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService
  ) {}

  listForUser(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
  }

  async transfer(userId: string, dto: CreateTransferDto) {
    const source = await this.prisma.account.findFirst({
      where: { id: dto.sourceAccountId, userId }
    });

    if (!source) {
      throw new NotFoundException('Source account not found');
    }

    if (Number(source.balance) < dto.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayTotal = await this.prisma.transaction.aggregate({
      where: {
        userId,
        type: TransactionType.TRANSFER,
        createdAt: { gte: todayStart },
        status: { in: [TransactionStatus.SUCCESS, TransactionStatus.FLAGGED] }
      },
      _sum: { amount: true }
    });

    const projected = Number(todayTotal._sum.amount || 0) + dto.amount;
    if (projected > DAILY_TRANSFER_LIMIT) {
      throw new BadRequestException('Daily transfer limit exceeded');
    }

    const target =
      dto.targetAccountId
        ? await this.prisma.account.findUnique({ where: { id: dto.targetAccountId } })
        : dto.targetUserEmail
          ? await this.prisma.account.findFirst({
              where: {
                user: { email: dto.targetUserEmail.toLowerCase() },
                currency: dto.currency
              }
            })
          : null;

    if (!target) {
      throw new NotFoundException('Recipient account not found');
    }

    const flaggedReason = this.detectSuspiciousTransfer(dto.amount, source.userId, target.userId);
    const status = flaggedReason ? TransactionStatus.FLAGGED : TransactionStatus.SUCCESS;

    const result = await this.prisma.$transaction(async (tx) => {
      await tx.account.update({
        where: { id: source.id },
        data: { balance: new Prisma.Decimal(Number(source.balance) - dto.amount) }
      });

      await tx.account.update({
        where: { id: target.id },
        data: { balance: { increment: dto.amount } }
      });

      return tx.transaction.create({
        data: {
          userId,
          sourceAccountId: source.id,
          targetAccountId: target.id,
          type: TransactionType.TRANSFER,
          amount: dto.amount,
          currency: dto.currency,
          description: dto.description,
          status,
          flaggedReason
        }
      });
    });

    await this.notifications.createInApp(
      userId,
      'Transfer processed',
      flaggedReason
        ? `Transfer sent but marked for review: ${flaggedReason}`
        : `Transfer of ${dto.amount} ${dto.currency} completed`
    );

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'TRANSFER_CREATED',
        entityType: 'Transaction',
        entityId: result.id,
        metadata: {
          amount: dto.amount,
          currency: dto.currency,
          targetAccountId: target.id,
          status
        }
      }
    });

    return result;
  }

  async topUp(userId: string, dto: CashOperationDto) {
    return this.changeCashBalance(userId, dto, TransactionType.TOP_UP, 1);
  }

  async withdraw(userId: string, dto: CashOperationDto) {
    return this.changeCashBalance(userId, dto, TransactionType.WITHDRAWAL, -1);
  }

  private async changeCashBalance(
    userId: string,
    dto: CashOperationDto,
    type: TransactionType,
    sign: 1 | -1
  ) {
    const account = await this.prisma.account.findFirst({
      where: { id: dto.accountId, userId }
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const nextBalance = Number(account.balance) + dto.amount * sign;
    if (nextBalance < 0) {
      throw new BadRequestException('Insufficient funds');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      await tx.account.update({
        where: { id: account.id },
        data: { balance: new Prisma.Decimal(nextBalance) }
      });

      return tx.transaction.create({
        data: {
          userId,
          sourceAccountId: sign < 0 ? account.id : null,
          targetAccountId: sign > 0 ? account.id : null,
          type,
          amount: dto.amount,
          currency: dto.currency,
          status: TransactionStatus.SUCCESS
        }
      });
    });

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: type,
        entityType: 'Transaction',
        entityId: result.id,
        metadata: { accountId: account.id, amount: dto.amount, currency: dto.currency }
      }
    });

    return result;
  }

  private detectSuspiciousTransfer(amount: number, sourceUserId: string, targetUserId: string) {
    if (amount >= LARGE_TRANSFER_THRESHOLD) {
      return 'Large transfer over threshold';
    }

    if (sourceUserId === targetUserId) {
      return 'Transfer between own shadow accounts';
    }

    return null;
  }
}
