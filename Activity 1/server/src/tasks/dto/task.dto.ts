import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    description: 'ID of the task',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the task',
    example: 'Finish assignment',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the category this task belongs to',
    example: 2,
  })
  categoryId: number;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Assignment about creating an API documentation',
  })
  description?: string | null;

  @ApiProperty({
    description: 'Due date of the task (ISO 8601 format)',
    example: '2013-03-01T23:59:59Z',
  })
  dueDate?: Date | string | null;

  @ApiProperty({
    description: 'Date when task is created (ISO 8601 format)',
    example: '2013-03-01T23:59:59Z',
  })
  updatedAt?: Date | string;

  @ApiProperty({
    description: 'Date when task is updated (ISO 8601 format)',
    example: '2013-03-01T23:59:59Z',
  })
  createdAt?: Date | string;
}
