import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import multerOptions from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthorDto } from './dto/author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({ status: 201, description: 'author created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  create(
    @Body(ValidationPipe) createAuthorDto: CreateAuthorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authorsService.create(createAuthorDto, file.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all authors' })
  @ApiResponse({
    status: 200,
    description: 'All authors fetched successfully.',
    type: AuthorDto,
    isArray: true,
  })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch an author' })
  @ApiResponse({
    status: 200,
    description: 'Author fetched successfully.',
    type: AuthorDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the author',
    example: 1,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully. Returns the updated author.',
    type: AuthorDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No author found with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the author',
    example: 1,
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateAuthorDto: UpdateAuthorDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.authorsService.update(id, updateAuthorDto, file?.filename);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({
    status: 200,
    description: 'Folder deleted successfully. Returns the deleted folder.',
    type: AuthorDto,
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.remove(id);
  }
}
