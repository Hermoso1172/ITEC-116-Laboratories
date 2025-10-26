import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
  Request,
  BadRequestException,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(
    @Request() req: any,
    @Body(ValidationPipe)
    createFolderDto: CreateFolderDto,
  ) {
    const userId = req.user.id;
    return this.foldersService.create(createFolderDto, userId);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.id;
    return this.foldersService.findAll(userId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.foldersService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateFolderDto: UpdateFolderDto,
  ) {
    const userId = req.user.id;
    return this.foldersService.update(id, updateFolderDto, userId);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.foldersService.remove(id, userId);
  }
}
