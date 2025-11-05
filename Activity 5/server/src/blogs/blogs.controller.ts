import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ValidationPipe,
  UploadedFile,
  ParseIntPipe,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Categories, CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import multerOptions from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { BlogDto } from './dto/blog.dto';

@ApiBearerAuth()
@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Blog created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  create(
    @Request() req: any,
    @Body(ValidationPipe) createBlogDto: CreateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.blogsService.create(createBlogDto, userId, file?.filename);
  }
  @Get()
  @ApiOperation({ summary: 'Fetch all blogs' })
  @ApiResponse({
    status: 200,
    description: 'All blogs fetched successfully.',
    type: BlogDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of items to fetch',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset of items to fetch',
  })
  @ApiQuery({
    name: 'authorId',
    required: false,
    type: Number,
    description: 'Filter by author ID',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter by category',
    enum: Categories,
  })
  findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('authorId') authorId?: string,
    @Query('category') category?: Categories,
  ) {
    return this.blogsService.findAll(
      offset ? parseInt(offset) : 0,
      limit ? parseInt(limit) : 10,
      authorId ? parseInt(authorId) : undefined,
      category,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch an blog' })
  @ApiResponse({
    status: 200,
    description: 'blog fetched successfully.',
    type: BlogDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the blog',
    example: 1,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog' })
  @ApiResponse({
    status: 200,
    description: 'book updated successfully. Returns the updated Blog.',
    type: BlogDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No Blog found with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the Blog',
    example: 1,
  })
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBlogDto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.blogsService.update(id, updateBlogDto, file?.filename);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Blog' })
  @ApiResponse({
    status: 200,
    description: 'Folder deleted successfully. Returns the deleted Blog.',
    type: BlogDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No Blog folder with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the Blog',
    example: 1,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.remove(id);
  }
}
