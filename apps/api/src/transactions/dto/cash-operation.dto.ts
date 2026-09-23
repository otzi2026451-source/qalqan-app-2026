import { AccountCurrency } from '@prisma/client';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class CashOperationDto {
  @IsString()
  accountId!: string;

  @IsNumber()
  @Min(1)
  amount!: number;

  @IsEnum(AccountCurrency)
  currency!: AccountCurrency;
}
