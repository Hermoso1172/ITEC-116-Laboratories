import { IsNotEmpty, IsString } from 'class-validator';
import { Prisma } from 'generated/prisma';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  task?: Prisma.TaskCreateNestedManyWithoutCategoryInput;
}
