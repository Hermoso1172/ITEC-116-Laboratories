import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({
    description: 'ID of the author',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the author',
    example: 'johndoe',
  })
  name: string;

  @ApiProperty({
    description: 'Bio of the author',
    example: 'very good',
  })
  bio: string;

  @ApiProperty({
    description: 'name of the picture of the author',
    example: 'image.jpg',
  })
  picture: string;
}
