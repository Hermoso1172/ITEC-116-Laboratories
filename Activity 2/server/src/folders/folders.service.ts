import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createFolderDto: CreateFolderDto, userId: number) {
    try {
      return await this.databaseService.folders.create({
        data: {
          ...createFolderDto,
          user: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    try {
      return await this.databaseService.folders.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const folderExists = await this.databaseService.folders.findUnique({
        where: {
          id: id,
        },
      });
      if (!folderExists) {
        throw new NotFoundException();
      }
      if (folderExists.userId !== userId) {
        throw new UnauthorizedException();
      }
      return folderExists;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateFolderDto: UpdateFolderDto, userId: number) {
    const folderExists = await this.findOne(id, userId);
    if (!folderExists) throw new NotFoundException();

    try {
      return await this.databaseService.folders.update({
        data: updateFolderDto,
        where: {
          id: id,
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      const folderExists = await this.findOne(id, userId);
      if (!folderExists) throw new NotFoundException();
      return this.databaseService.folders.delete({
        where: {
          id: id,
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
