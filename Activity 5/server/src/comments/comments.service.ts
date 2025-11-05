import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCommentDto: CreateCommentDto, userId: number) {
    try {
      return await this.databaseService.comment.create({
        data: {
          content: createCommentDto.content,
          blog: { connect: { id: createCommentDto.blogId } },
          user: { connect: { id: userId } },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    try {
      return await this.databaseService.comment.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          blog: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.comment.findUnique({
        where: {
          id: id,
        },
        include: {
          user: true,
          blog: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.databaseService.comment.update({
        data: updateCommentDto,
        where: {
          id: id,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
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
      return await this.databaseService.comment.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
