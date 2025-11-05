import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';

@ApiBearerAuth()
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  create(@Request() req: any, @Body() createCommentDto: CreateCommentDto) {
    const userId = req.user.id;
    return this.commentsService.create(createCommentDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({
    status: 200,
    description: 'All comments fetched successfully.',
    type: CommentDto,
    isArray: true,
  })
  findAll(@Request() req: any) {
    const userId = req.user.id;
    return this.commentsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment fetched successfully.',
    type: CommentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the comment',
    example: 1,
  })
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment updated successfully. Returns the updated task.',
    type: CommentDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No Comment found with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment deleted successfully. Returns the deleted Comment.',
    type: CommentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No task Comment with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(id);
  }
}
