import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createInApp(userId: string, title: string, body: string) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        channel: 'IN_APP',
        title,
        body
      }
    });

    // В production эти записи уходят в очередь worker'ов для внешних провайдеров.
    await Promise.allSettled([
      this.queueEmail(userId, title, body),
      this.queuePush(userId, title, body)
    ]);

    return notification;
  }

  list(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
  }

  private queueEmail(userId: string, title: string, body: string) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        action: 'EMAIL_NOTIFICATION_QUEUED',
        entityType: 'Notification',
        entityId: title,
        metadata: { body }
      }
    });
  }

  private queuePush(userId: string, title: string, body: string) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        action: 'PUSH_NOTIFICATION_QUEUED',
        entityType: 'Notification',
        entityId: title,
        metadata: { body }
      }
    });
  }
}
