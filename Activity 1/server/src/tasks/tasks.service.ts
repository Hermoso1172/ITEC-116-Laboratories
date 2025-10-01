import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTaskDto: Prisma.TaskCreateInput) {
    try {
      return this.databaseService.task.create({
        data: createTaskDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException('Category does not exist');
        }
      }
      throw error;
    }
  }

  findAll(categoryId?: number, dueDate?: Date) {
    return this.databaseService.task.findMany({
      where: {
        categoryId: categoryId,
        dueDate: dueDate,
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.task.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    const findTask = await this.findOne(id);
    if (!findTask) throw new NotFoundException('Task Not Found');

    try {
      return this.databaseService.task.update({
        data: updateTaskDto,
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException('Category does not exist');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    const findTask = await this.findOne(id);
    if (!findTask) throw new NotFoundException('Task Not Found');

    return this.databaseService.task.delete({
      where: {
        id: id,
      },
    });
  }
}
