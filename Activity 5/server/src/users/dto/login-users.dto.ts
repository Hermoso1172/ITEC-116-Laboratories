import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginUsersDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
