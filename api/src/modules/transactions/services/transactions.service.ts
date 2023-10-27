import { Injectable, NotFoundException } from '@nestjs/common';

import { ValidateBankAccountOwnershipService } from '@/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '@/modules/categories/services/validate-category-ownership.service';
import { TransactionsRepository } from '@/shared/database/repositories/transactions.repositories';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionType } from '../entities/Transaction';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  findAllByUserId(
    userId: string,
    filters: {
      monthIndex: number;
      year: number;
      bankAccountId: string;
      type: TransactionType;
    },
  ) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.monthIndex)),
          lt: new Date(Date.UTC(filters.year, filters.monthIndex + 1)),
        },
        type: filters.type,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async findOneByUserId(userId: string, transactionId: string) {
    const transaction = await this.transactionsRepository.findUnique({
      where: {
        userId,
        id: transactionId,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
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

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionsRepository.delete({
      where: {
        id: transactionId,
      },
    });
  }

  private async validateEntitiesOwnership({
    userId,
    transactionId,
    bankAccountId,
    categoryId,
  }: {
    userId: string;
    transactionId?: string;
    bankAccountId?: string;
    categoryId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
