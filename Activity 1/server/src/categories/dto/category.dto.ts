import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'ID of the category',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Capstone',
  })
  name: string;

  @ApiProperty({
    description: 'Color of the category (hex code)',
    example: '#fff',
  })
  color: string;
}
