import { Injectable } from '@nestjs/common';

import { ValidateBankAccountOwnershipService } from '@/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '@/modules/categories/services/validate-category-ownership.service';
import { TransactionsRepository } from '@/shared/database/repositories/transactions.repositories';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(transactionId: string) {
    return `This action returns a #${transactionId} transaction`;
  }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, value, date, type } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, name, value, date, type } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      transactionId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepository.update({
      where: {
        id: transactionId,
      },
      data: {
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  remove(transactionId: string) {
    return `This action removes a #${transactionId} transaction`;
  }

  private async validateEntitiesOwnership({
    userId,
    transactionId,
    bankAccountId,
    categoryId,
  }: {
    userId: string;
    transactionId?: string;
    bankAccountId: string;
    categoryId: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
