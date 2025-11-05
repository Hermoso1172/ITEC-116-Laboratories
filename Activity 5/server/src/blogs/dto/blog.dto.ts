import { ApiProperty } from '@nestjs/swagger';

export enum Categories {
  commercial = 'commercial',
  design = 'design',
  nature = 'nature',
  people = 'people',
  photography = 'photography',
  tech = 'tech',
  travel = 'travel',
  uncategorized = 'uncategorized',
}

export class BlogDto {
  @ApiProperty({
    description: 'ID of the blog',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the user who owns this blog',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Title of the blog',
    example: 'Bloggy',
  })
  title: string;

  @ApiProperty({
    description: 'Subtitle of the blog',
    example: 'Bloggy',
  })
  subtitle: string;

  @ApiProperty({
    description: 'Content of the blog',
    example: 'Bloggy',
  })
  content: string;

  @ApiProperty({
    description: 'Category of the blog',
    example: 'commercial',
  })
  category: Categories;

  @ApiProperty({
    description: 'name of the picture of the blog',
    example: 'image.jpg',
  })
  picture: string;
}
