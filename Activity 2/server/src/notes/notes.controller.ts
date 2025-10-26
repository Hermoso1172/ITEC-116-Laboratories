import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Request() req: any,
    @Body(ValidationPipe)
    createNoteDto: CreateNoteDto,
  ) {
    const userId = req.user.id;
    return this.notesService.create(createNoteDto, userId);
  }

  @Get()
  findAll(
    @Request() req: any,
    @Query('folderId', new ParseIntPipe({ optional: true }))
    folderId?: number,
  ) {
    const userId = req.user.id;
    return this.notesService.findAll(userId, folderId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.notesService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateNoteDto: UpdateNoteDto,
  ) {
    const userId = req.user.id;
    return this.notesService.update(id, updateNoteDto, userId);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.notesService.remove(id, userId);
  }
}
