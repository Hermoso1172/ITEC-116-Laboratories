import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({
    description: 'ID of the book',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the author of the book',
    example: 1,
  })
  authorId: number;

  @ApiProperty({
    description: 'ID of the category of the book',
    example: 1,
  })
  categoryId: number;

  @ApiProperty({
    description: 'Name of the book',
    example: 'Harry Potter',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'very good',
  })
  description: string;

  @ApiProperty({
    description: 'name of the picture of the book',
    example: 'image.jpg',
  })
  picture: string;
}
