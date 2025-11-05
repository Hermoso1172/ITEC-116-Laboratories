import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from 'src/config/multer.config';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'book created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  create(
    @Body(ValidationPipe) createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.booksService.create(createBookDto, file.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all authors' })
  @ApiResponse({
    status: 200,
    description: 'All authors fetched successfully.',
    type: BookDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of items to fetch',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: Number,
    description: 'Filter by category ID',
  })
  @ApiQuery({
    name: 'authorId',
    required: false,
    type: Number,
    description: 'Filter by author ID',
  })
  findAll(
    @Query('limit') limit?: string,
    @Query('categoryId') categoryId?: string,
    @Query('authorId') authorId?: string,
  ) {
    return this.booksService.findAll(
      limit ? parseInt(limit) : undefined,
      categoryId ? parseInt(categoryId) : undefined,
      authorId ? parseInt(authorId) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch an book' })
  @ApiResponse({
    status: 200,
    description: 'book fetched successfully.',
    type: BookDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the book',
    example: 1,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an book' })
  @ApiResponse({
    status: 200,
    description: 'book updated successfully. Returns the updated book.',
    type: BookDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No book found with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the book',
    example: 1,
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.booksService.update(id, updateBookDto, file?.filename);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 200,
    description: 'Folder deleted successfully. Returns the deleted book.',
    type: BookDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No book folder with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the book',
    example: 1,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
