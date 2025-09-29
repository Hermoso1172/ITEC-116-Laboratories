import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({
      data: createTaskDto,
    });
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
    if (!findTask) throw new HttpException('Task Not Found', 404);

    return this.databaseService.task.update({
      data: updateTaskDto,
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    const findTask = await this.findOne(id);
    if (!findTask) throw new HttpException('Task Not Found', 404);

    return this.databaseService.task.delete({
      where: {
        id: id,
      },
    });
  }
}
