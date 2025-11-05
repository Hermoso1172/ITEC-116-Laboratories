import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import multerOptions from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'category created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.create(createCategoryDto, file.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all categories' })
  @ApiResponse({
    status: 200,
    description: 'All categories fetched successfully.',
    type: CategoryDto,
    isArray: true,
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a Category' })
  @ApiResponse({
    status: 200,
    description: 'Category fetched successfully.',
    type: CategoryDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the Category',
    example: 1,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an category' })
  @ApiResponse({
    status: 200,
    description: 'category updated successfully. Returns the updated category.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No category found with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category',
    example: 1,
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.categoriesService.update(id, updateCategoryDto, file?.filename);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Category' })
  @ApiResponse({
    status: 200,
    description: 'Folder deleted successfully. Returns the deleted folder.',
    type: CategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No category folder with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category',
    example: 1,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
