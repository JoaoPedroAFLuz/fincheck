import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from '@/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

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

  async findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
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
    });

    if (!bankAccount) {
      throw new NotFoundException("Bank account don't found");
    }

    return { bankAccount };
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const isOwner = await this.bankAccountsRepository.findUnique({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException("Bank account don't found");
    }

    const { name, initialBalance, type, color } = updateBankAccountDto;

    return this.bankAccountsRepository.update({
      where: {
        userId,
        id: bankAccountId,
      },
      data: { name, initialBalance, type, color },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
