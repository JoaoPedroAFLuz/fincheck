import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { TransactionType } from '../entities/Transaction';

export class CreateTransactionDto {
  @IsUUID()
  bankAccountId: string;

  @IsUUID()
  @IsOptional()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsDateString()
  date: string;

  @IsEnum(TransactionType)
  type: TransactionType;
}
