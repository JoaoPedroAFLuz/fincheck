import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from '@/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            name: true,
            value: true,
            type: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const currentBalance = transactions.reduce(
        (acc, transaction) =>
          transaction.type === 'INCOME'
            ? acc + transaction.value
            : acc - transaction.value,
        bankAccount.initialBalance,
      );

      return { ...bankAccount, currentBalance };
    });
  }

  async findOneByUserIdAndByBankAccountId(
    userId: string,
    bankAccountId: string,
  ) {
    const bankAccount = await this.bankAccountsRepository.findUnique({
      where: {
        userId,
        id: bankAccountId,
      },
      include: {
        transactions: {
          select: {
            name: true,
            value: true,
            type: true,
          },
        },
      },
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }

    const { transactions, ...bankAccountDto } = bankAccount;

    const currentBalance = transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'INCOME'
          ? acc + transaction.value
          : acc - transaction.value,
      bankAccountDto.initialBalance,
    );

    return { ...bankAccountDto, currentBalance };
  }

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    const { name, initialBalance, type, color } = updateBankAccountDto;

    return this.bankAccountsRepository.update({
      where: {
        userId,
        id: bankAccountId,
      },
      data: { name, initialBalance, type, color },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepository.delete({
      where: {
        userId,
        id: bankAccountId,
      },
    });
  }
}
