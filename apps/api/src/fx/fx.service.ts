import { Injectable } from '@nestjs/common';
import { AccountCurrency } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FxService {
  constructor(private readonly prisma: PrismaService) {}

  listRates() {
    return this.prisma.fxRate.findMany({
      orderBy: [{ base: 'asc' }, { quote: 'asc' }]
    });
  }

  async convert(base: AccountCurrency, quote: AccountCurrency, amount: number) {
    const rate = await this.prisma.fxRate.findUnique({
      where: { base_quote: { base, quote } }
    });

    return {
      base,
      quote,
      amount,
      rate: Number(rate?.rate || 1),
      convertedAmount: Number(rate?.rate || 1) * amount
    };
  }
}
