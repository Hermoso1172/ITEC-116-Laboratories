import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { FoldersService } from 'src/folders/folders.service';

@Injectable()
export class NotesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly foldersService: FoldersService,
  ) {}
  async create(createNoteDto: CreateNoteDto, userId: number) {
    try {
      // ensure the folder exists and belongs to the user
      await this.foldersService.findOne(createNoteDto.folderId, userId);

      return await this.databaseService.notes.create({
        data: {
          title: createNoteDto.title,
          content: createNoteDto.content,
          folders: { connect: { id: createNoteDto.folderId } },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number, folderId?: number) {
    try {
      return await this.databaseService.notes.findMany({
        where: {
          folders: {
            userId: userId,
          },
          folderId: folderId,
        },
        include: {
          folders: {
            select: {
              color: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, userId: number) {
    try {
      return await this.databaseService.notes.findFirst({
        where: {
          folders: {
            userId: userId,
          },
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    try {
      return await this.databaseService.notes.update({
        data: updateNoteDto,
        where: {
          id: id,
          folders: {
            userId: userId,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, userId: number) {
    try {
      return await this.databaseService.notes.delete({
        where: {
          id: id,
          folders: {
            userId: userId,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
