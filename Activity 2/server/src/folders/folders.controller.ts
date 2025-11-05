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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { FolderDto } from './dto/folder.dto';

@ApiBearerAuth()
@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new folder' })
  @ApiResponse({ status: 201, description: 'Folder created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  create(
    @Request() req: any,
    @Body(ValidationPipe)
    createFolderDto: CreateFolderDto,
  ) {
    const userId = req.user.id;
    return this.foldersService.create(createFolderDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all folders' })
  @ApiResponse({
    status: 200,
    description: 'All fodlers fetched successfully.',
    type: FolderDto,
    isArray: true,
  })
  findAll(@Request() req: any) {
    const userId = req.user.id;
    return this.foldersService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a folder' })
  @ApiResponse({
    status: 200,
    description: 'Folder fetched successfully.',
    type: FolderDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the folder',
    example: 1,
  })
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.foldersService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a folder' })
  @ApiResponse({
    status: 200,
    description: 'Folder updated successfully. Returns the updated author.',
    type: FolderDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No folder found with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the folder',
    example: 1,
  })
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateFolderDto: UpdateFolderDto,
  ) {
    const userId = req.user.id;
    return this.foldersService.update(id, updateFolderDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a folder' })
  @ApiResponse({
    status: 200,
    description: 'Folder deleted successfully. Returns the deleted folder.',
    type: FolderDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No task folder with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.foldersService.remove(id, userId);
  }
}
