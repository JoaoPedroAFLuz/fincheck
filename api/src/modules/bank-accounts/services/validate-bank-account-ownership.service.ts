import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from '@/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepository.findUnique({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException("Bank account don't found");
    }
  }
}
