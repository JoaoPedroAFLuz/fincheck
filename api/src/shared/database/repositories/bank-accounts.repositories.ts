import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany<T extends Prisma.BankAccountFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>,
  ) {
    return this.prismaService.bankAccount.findMany(findManyDto);
  }

  findUnique<T extends Prisma.BankAccountFindUniqueArgs>(
    findUniqueDto: Prisma.SelectSubset<T, Prisma.BankAccountFindUniqueArgs>,
  ) {
    return this.prismaService.bankAccount.findUnique(findUniqueDto);
  }

  create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto);
  }

  update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateDto);
  }

  delete(removeDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(removeDto);
  }
}
