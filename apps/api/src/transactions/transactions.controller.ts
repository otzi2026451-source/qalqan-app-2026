import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CashOperationDto } from './dto/cash-operation.dto';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  list(@CurrentUser() user: { sub: string }) {
    return this.transactionsService.listForUser(user.sub);
  }

  @Post('transfer')
  transfer(@CurrentUser() user: { sub: string }, @Body() dto: CreateTransferDto) {
    return this.transactionsService.transfer(user.sub, dto);
  }

  @Post('top-up')
  topUp(@CurrentUser() user: { sub: string }, @Body() dto: CashOperationDto) {
    return this.transactionsService.topUp(user.sub, dto);
  }

  @Post('withdraw')
  withdraw(@CurrentUser() user: { sub: string }, @Body() dto: CashOperationDto) {
    return this.transactionsService.withdraw(user.sub, dto);
  }
}
