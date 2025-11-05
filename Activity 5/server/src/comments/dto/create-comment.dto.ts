import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Id of the blog this comment belongs to',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  blogId: number;

  @ApiProperty({
    description: 'Content of the comment',
    example: 'Assignment is good',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
