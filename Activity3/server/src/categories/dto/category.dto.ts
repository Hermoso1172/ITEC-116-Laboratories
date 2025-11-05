import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'ID of the category',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the category',
    example: 'johndoe',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the category',
    example: 'very good',
  })
  description: string;

  @ApiProperty({
    description: 'name of the picture of the category',
    example: 'image.jpg',
  })
  picture: string;
}
