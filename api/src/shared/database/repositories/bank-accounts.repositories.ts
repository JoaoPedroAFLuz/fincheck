import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBankAccountDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createBankAccountDto);
  }

  findMany(findManyDto: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(findManyDto);
  }

  findUnique(findUniqueDto: Prisma.BankAccountFindUniqueArgs) {
    return this.prismaService.bankAccount.findUnique(findUniqueDto);
  }
}
