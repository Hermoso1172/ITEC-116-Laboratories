import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import LoginUsersDto from 'src/users/dto/login-users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginUsersDto: LoginUsersDto) {
    try {
      const { id, username, email } =
        await this.userService.validateUser(loginUsersDto);
      const payload = {
        id,
        username,
        email,
      };
      return {
        accessToken: this.jwtService.sign(payload),
        user: { id, username, email },
      };
    } catch (error) {
      throw error;
    }
  }

  async signup(registerUserDto: Prisma.UsersCreateInput) {
    try {
      const { id, username, email } =
        await this.userService.signup(registerUserDto);
      const payload = {
        id: id,
        username: username,
        email,
      };
      return {
        accessToken: this.jwtService.sign(payload),
        user: {
          id,
          username,
          email,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
