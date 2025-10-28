import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import LoginUsersDto from 'src/users/dto/login-users.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import RegisterUserDto from 'src/users/dto/register-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) registerDto: RegisterUserDto) {
    const user = this.authService.signup(registerDto);
    return user;
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() loginDto: LoginUsersDto) {
    const user = this.authService.login(loginDto);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    return user;
  }
}
