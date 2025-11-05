import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Id of the folder this note belongs to',
    example: 2,
  })
  @IsNumber()
  folderId: number;

  @ApiProperty({
    description: 'Title of the note',
    example: 'Assignment 1',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of the note',
    example: 'Assignment is good',
  })
  @IsString()
  content: string;
}
