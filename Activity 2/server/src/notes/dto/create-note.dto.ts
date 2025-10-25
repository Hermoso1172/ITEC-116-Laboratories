import { IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNumber()
  folderId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
