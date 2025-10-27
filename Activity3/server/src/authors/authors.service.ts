import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      return await this.databaseService.authors.create({
        data: createAuthorDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.databaseService.authors.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.authors.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      return await this.databaseService.authors.update({
        data: updateAuthorDto,
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
      return await this.databaseService.authors.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
