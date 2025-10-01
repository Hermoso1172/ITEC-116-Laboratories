import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    try {
      return await this.databaseService.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException();
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.databaseService.category.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException();

    try {
      return this.databaseService.category.update({
        data: updateCategoryDto,
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException();
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException();

    return this.databaseService.category.delete({
      where: {
        id: id,
      },
    });
  }
}
