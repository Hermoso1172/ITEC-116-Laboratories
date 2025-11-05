import {
  Body,
  Controller,
  Patch,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from 'src/config/multer.config';
import { UpdateUsersDto } from './dto/update-users.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Patch()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully. Returns the updated user.',
    type: UpdateUsersDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No user found with the given ID.',
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  update(
    @Request() req: any,
    @Body(ValidationPipe) updateUsersDto: UpdateUsersDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.userService.update(userId, updateUsersDto, file?.filename);
  }
}
