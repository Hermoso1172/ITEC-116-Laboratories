import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createBookDto: CreateBookDto, picture: string) {
    try {
      return this.databaseService.books.create({
        data: { ...createBookDto, picture: picture },
      });
    } catch (error) {}
  }

  async findAll(limit?: number, categoryId?: number, authorId?: number) {
    try {
      return await this.databaseService.books.findMany({
        ...(limit && {
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        include: {
          author: {
            select: { name: true },
          },
          category: {
            select: { name: true },
          },
        },
        where: {
          ...(categoryId && { categoryId }),
          ...(authorId && { authorId }),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.books.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto, picture?: string) {
    try {
      return await this.databaseService.books.update({
        data: { ...updateBookDto, picture: picture },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.books.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
