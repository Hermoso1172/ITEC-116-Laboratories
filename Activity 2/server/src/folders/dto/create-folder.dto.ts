import { Prisma } from '@prisma/client';
import { Folders } from '@prisma/client';
import { IsEnum, IsInt, IsString } from 'class-validator';

export enum Colors {
  RED = 'RED',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  CYAN = 'CYAN',
  PINK = 'PINK',
}

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsEnum(Colors, {
    message: 'Color must be one of the allowed color codes.',
  })
  color: Colors;
}
