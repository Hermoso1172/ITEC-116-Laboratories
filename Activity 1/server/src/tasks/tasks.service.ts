import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

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
    return this.databaseService.task.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return this.databaseService.task.update({
      data: updateTaskDto,
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.task.delete({
      where: {
        id: id,
      },
    });
  }
}
