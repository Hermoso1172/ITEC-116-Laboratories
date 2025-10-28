import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BlogsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createBlogDto: CreateBlogDto, picture: string, userId: number) {
    try {
      return await this.databaseService.blog.create({
        data: {
          ...createBlogDto,
          picture: picture,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(offset: number, limit: number, authorId?: number) {
    const where = authorId ? { userId: authorId } : {};
    try {
      const totalItems = await this.databaseService.blog.count({
        where,
      });

      const blogs = await this.databaseService.blog.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where,
      });
      const totalPages = Math.ceil(totalItems / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const hasNext = currentPage < totalPages;
      const hasPrevious = currentPage > 1;
      return {
        data: blogs,
        meta: { totalItems, totalPages, currentPage, hasNext, hasPrevious },
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.blog.findUnique({
        where: {
          id: id,
        },
        include: {
          comments: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateBlogDto: UpdateBlogDto,
    userId: number,
    picture?: string,
  ) {
    try {
      return await this.databaseService.blog.update({
        data: { ...updateBlogDto, picture: picture },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      return await this.databaseService.blog.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
