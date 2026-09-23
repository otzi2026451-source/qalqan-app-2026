import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AccountsService } from './accounts.service';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  list(@CurrentUser() user: { sub: string }) {
    return this.accountsService.getAccounts(user.sub);
  }

  @Get('summary')
  summary(@CurrentUser() user: { sub: string }) {
    return this.accountsService.getPortfolioSummary(user.sub);
  }
}
