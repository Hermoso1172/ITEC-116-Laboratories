import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Prisma } from 'generated/prisma';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  @ApiProperty({ description: 'Name of the category', example: 'Capstone' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Color of the category', example: '#0000ff' })
  @IsString()
  @IsNotEmpty()
  color: string;

  task?: Prisma.TaskCreateNestedManyWithoutCategoryInput;
}
