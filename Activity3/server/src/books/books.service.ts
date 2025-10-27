import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createBookDto: CreateBookDto) {
    try {
      return this.databaseService.books.create({
        data: createBookDto,
      });
    } catch (error) {}
  }

  async findAll(categoryId?: number, authorId?: number) {
    try {
      return await this.databaseService.books.findMany({
        where: {
          categoryId: categoryId,
          authorId: authorId,
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

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      return await this.databaseService.books.update({
        data: updateBookDto,
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
