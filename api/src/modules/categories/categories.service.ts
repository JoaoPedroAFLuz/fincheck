import { Injectable } from '@nestjs/common';

import { CategoriesRepository } from '@/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findMany(userId: string) {
    return this.categoriesRepository.findAllByUserId({
      where: {
        userId,
      },
      select: {
        name: true,
        icon: true,
        type: true,
      },
    });
  }
}
