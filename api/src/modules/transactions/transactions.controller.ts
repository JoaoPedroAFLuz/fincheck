import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ActiveUserId } from '@/shared/decorators/ActiveUserId';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.transactionsService.findAllByUserId(userId);
  }

  @Get(':transactionId')
  findOne(@Param('transactionId') transactionId: string) {
    return this.transactionsService.findOne(transactionId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      userId,
      transactionId,
      updateTransactionDto,
    );
  }

  @Delete(':transactionId')
  remove(@Param('transactionId') transactionId: string) {
    return this.transactionsService.remove(transactionId);
  }
}
