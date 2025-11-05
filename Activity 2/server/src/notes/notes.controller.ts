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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { NoteDto } from './dto/note.dto';

@ApiBearerAuth()
@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'Note created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  create(
    @Request() req: any,
    @Body(ValidationPipe)
    createNoteDto: CreateNoteDto,
  ) {
    const userId = req.user.id;
    return this.notesService.create(createNoteDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all notes' })
  @ApiResponse({
    status: 200,
    description: 'All notes fetched successfully.',
    type: NoteDto,
    isArray: true,
  })
  findAll(
    @Request() req: any,
    @Query('folderId', new ParseIntPipe({ optional: true }))
    folderId?: number,
  ) {
    const userId = req.user.id;
    return this.notesService.findAll(userId, folderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a note' })
  @ApiResponse({
    status: 200,
    description: 'Note fetched successfully.',
    type: NoteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the folder',
    example: 1,
  })
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.notesService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({
    status: 200,
    description: 'Note updated successfully. Returns the updated task.',
    type: NoteDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 404,
    description: 'No note found with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateNoteDto: UpdateNoteDto,
  ) {
    const userId = req.user.id;
    return this.notesService.update(id, updateNoteDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a folder' })
  @ApiResponse({
    status: 200,
    description: 'Folder deleted successfully. Returns the deleted folder.',
    type: NoteDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No task folder with the given ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the task',
    example: 1,
  })
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.notesService.remove(id, userId);
  }
}
