import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class NoteDto {
  @ApiProperty({
    description: 'ID of the note',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the folder',
    example: 1,
  })
  folderId: number;

  @ApiProperty({
    description: 'Title of the note',
    example: 'Assignment 1',
  })
  title: string;

  @ApiProperty({
    description: 'Content of the Note',
    example: 'Capstones',
  })
  content: string;
}
