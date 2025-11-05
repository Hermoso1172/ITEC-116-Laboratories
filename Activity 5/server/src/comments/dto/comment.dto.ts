import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    description: 'ID of the comment',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the blog',
    example: 1,
  })
  blogId: number;

  @ApiProperty({
    description: 'ID of the user',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Content of the comment',
    example: 'Capstones',
  })
  content: string;
}
