import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Prisma } from 'generated/prisma';

export class CreateTaskDto implements Prisma.TaskCreateInput {
  @ApiProperty({
    description: 'ID of the category this task belongs to',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    description: 'Name of the task',
    example: 'Finish assignment',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Assignment about creating an API documentation',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Due date of the task (ISO 8601 format)',
    example: '2025-09-29T13:30:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
  category: Prisma.CategoryCreateNestedOneWithoutTaskInput;
}
