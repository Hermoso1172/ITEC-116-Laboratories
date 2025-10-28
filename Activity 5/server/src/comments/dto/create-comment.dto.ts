import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  blogId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
