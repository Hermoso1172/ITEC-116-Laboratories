import {
  Body,
  Controller,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import LoginUsersDto from 'src/users/dto/login-users.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import RegisterUserDto from 'src/users/dto/register-users.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 409,
    description: 'User with the same email or username already exists.',
  })
  register(@Body(ValidationPipe) registerDto: RegisterUserDto) {
    const user = this.authService.signup(registerDto);
    return user;
  }

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        access_token: 'jwt-token-here',
        user: { id: 1, username: 'johndoe', email: 'johndoe@gmail.com' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginUsersDto) {
    const user = this.authService.login(loginDto);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    return user;
  }
}
