import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Name of the folder',
    example: 2,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Color of the folder',
    example: 'RED',
  })
  @IsEnum(Colors, {
    message: 'Color must be one of the allowed color codes.',
  })
  color: Colors;
}
