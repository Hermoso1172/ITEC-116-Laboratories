import { Injectable } from '@nestjs/common';
import { Categories, CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BlogsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createBlogDto: CreateBlogDto, userId: number, picture?: string) {
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

  async findAll(
    skip: number,
    take: number,
    authorId?: number,
    category?: Categories,
  ) {
    const where: any = {};

    if (authorId) where.userId = authorId;
    if (category) where.category = category;

    try {
      const totalItems = await this.databaseService.blog.count({
        where,
      });

      const blogs = await this.databaseService.blog.findMany({
        skip: skip,
        take: take,
        orderBy: { createdAt: 'desc' },
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      const totalPages = Math.ceil(totalItems / take);
      const currentPage = Math.floor(skip / take) + 1;
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
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, picture?: string) {
    const data = { ...updateBlogDto, picture };
    try {
      return await this.databaseService.blog.update({
        data: data,
        where: {
          id: id,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
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
