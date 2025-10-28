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
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import multerOptions from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  create(
    @Request() req: any,
    @Body(ValidationPipe) createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.blogsService.create(createBlogDto, file.filename, userId);
  }

  @Get()
  findAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('authorId') authorId?: string,
  ) {
    return this.blogsService.findAll(
      offset,
      limit,
      authorId ? parseInt(authorId) : undefined,
    );
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBlogDto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.blogsService.update(id, updateBlogDto, userId, file?.filename);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.blogsService.remove(id, userId);
  }
}
