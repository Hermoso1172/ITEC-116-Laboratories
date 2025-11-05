import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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

export class CreateBlogDto {
  @ApiProperty({
    description: 'Title of the blog',
    example: 'Bloggy',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Subtitle of the blog',
    example: 'Bloggy',
  })
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ApiProperty({
    description: 'Content of the blog',
    example: 'Bloggy',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Category of the blog',
    example: 'commercial',
  })
  @IsEnum(Categories)
  category: Categories;
}
