import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createUserDto);
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDto);
  }
}
