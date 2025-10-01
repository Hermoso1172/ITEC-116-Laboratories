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
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 409,
    description: 'Category with the same name already exists.',
  })
  @Post()
  create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Fetch all categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories fetched successfully',
    type: CategoryDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a category' })
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
    description: 'The unique identifier of the category',
    example: 1,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully.',
    type: CategoryDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 404,
    description: 'No category found with the given ID.',
  })
  @ApiResponse({
    status: 409,
    description: 'Category with the same name already exists.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category',
    example: 1,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No category found with the given ID.',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
