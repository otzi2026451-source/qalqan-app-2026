import { AccountCurrency } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTransferDto {
  @IsString()
  sourceAccountId!: string;

  @IsOptional()
  @IsString()
  targetAccountId?: string;

  @IsOptional()
  @IsString()
  targetUserEmail?: string;

  @IsNumber()
  @Min(1)
  amount!: number;

  @IsEnum(AccountCurrency)
  currency!: AccountCurrency;

  @IsOptional()
  @IsString()
  description?: string;
}
