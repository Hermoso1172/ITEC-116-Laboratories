import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseDatePipe,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'A new task is created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category does not exist.',
  })
  //transform true converts the data to its intended data type
  create(
    @Body(new ValidationPipe({ transform: true })) createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all tasks' })
  @ApiResponse({
    status: 200,
    description: 'All tasks fetched successfully.',
    type: TaskDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiQuery({
    name: 'categoryId',
    description: 'Filter tasks by category ID',
    example: 2,
  })
  @ApiQuery({
    name: 'dueDate',
    description: 'Filter tasks by due date (ISO 8601 format)',
    example: '2025-09-29T13:30:00Z',
  })
  findAll(
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    category?: number,
    @Query('dueDate', new ParseDatePipe({ optional: true })) dueDate?: Date,
  ) {
    return this.tasksService.findAll(category, dueDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a task' })
  @ApiResponse({
    status: 200,
    description: 'Task fetched successfully.',
    type: TaskDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully. Returns the updated task.',
    type: TaskDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No task found with the given ID or category does not exist.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully. Returns the deleted task.',
    type: TaskDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({ status: 404, description: 'No task found with the given ID.' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
