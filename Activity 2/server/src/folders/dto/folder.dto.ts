import { ApiProperty } from '@nestjs/swagger';

export class FolderDto {
  @ApiProperty({
    description: 'ID of the folder',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the user who owns this folder',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Name of the folder',
    example: 'Capstones',
  })
  name: string;

  @ApiProperty({
    description: 'Color of the folder',
    example: 'RED',
  })
  color: Colors;
}

export enum Colors {
  RED = 'RED',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  CYAN = 'CYAN',
  PINK = 'PINK',
}
