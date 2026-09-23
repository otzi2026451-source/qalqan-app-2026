import { Controller, Get, Query } from '@nestjs/common';
import { AccountCurrency } from '@prisma/client';
import { FxService } from './fx.service';

@Controller('fx')
export class FxController {
  constructor(private readonly fxService: FxService) {}

  @Get('rates')
  rates() {
    return this.fxService.listRates();
  }

  @Get('convert')
  convert(
    @Query('base') base: AccountCurrency,
    @Query('quote') quote: AccountCurrency,
    @Query('amount') amount: string
  ) {
    return this.fxService.convert(base, quote, Number(amount));
  }
}
