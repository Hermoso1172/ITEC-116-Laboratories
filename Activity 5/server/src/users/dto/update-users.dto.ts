import { PartialType } from '@nestjs/swagger';
import RegisterUserDto from './register-users.dto';

export class UpdateUsersDto extends PartialType(RegisterUserDto) {}
