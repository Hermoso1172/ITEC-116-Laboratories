import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.databaseService.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.databaseService.category.findMany();
  }

  findOne(id: number) {
    return this.databaseService.category.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.databaseService.category.update({
      data: updateCategoryDto,
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.category.delete({
      where: {
        id: id,
      },
    });
  }
}
