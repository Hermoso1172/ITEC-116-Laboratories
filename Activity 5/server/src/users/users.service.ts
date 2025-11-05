import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import RegisterUserDto from './dto/register-users.dto';
import bcrypt from 'bcrypt';
import LoginUsersDto from './dto/login-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signup(registerUserDto: RegisterUserDto) {
    const emailExists = await this.findUserByEmail(registerUserDto.email);
    if (emailExists) {
      throw new ConflictException('Email already in use.');
    }
    const usernameExists = await this.findUserByUsername(
      registerUserDto.username,
    );
    if (usernameExists) {
      throw new ConflictException('Username already in use.');
    }

    const saltRounds = 10;
    const plainPassword = registerUserDto.password;

    const hashed = await bcrypt.hash(plainPassword, saltRounds);

    const newUser = await this.databaseService.user.create({
      data: { ...registerUserDto, password: hashed },
    });

    return newUser;
  }

  async validateUser(loginUsersDto: LoginUsersDto) {
    try {
      const foundUser = await this.databaseService.user.findUnique({
        where: {
          username: loginUsersDto.username,
        },
      });
      if (!foundUser) throw new UnauthorizedException('Invalid Credentials');

      const matchingPassword = await bcrypt.compare(
        loginUsersDto.password,
        foundUser.password,
      );

      if (!matchingPassword)
        throw new UnauthorizedException('Invalid Credentials');

      return foundUser;
    } catch (error) {
      throw error;
    }
  }

  async findUser(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          username: username,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: number,
    updateUsersDto: UpdateUsersDto,
    picture?: string,
  ) {
    try {
      const updatedUser = await this.databaseService.user.update({
        data: {
          username: updateUsersDto.username,
          email: updateUsersDto.email,
          picture: picture,
          about: updateUsersDto.about,
        },
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          picture: true,
          about: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
