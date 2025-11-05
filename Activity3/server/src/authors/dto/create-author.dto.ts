import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'Name of the author',
    example: 'johndoes',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Bio of the author',
    example: 'verygood',
  })
  @IsString()
  @IsNotEmpty()
  bio: string;
}
