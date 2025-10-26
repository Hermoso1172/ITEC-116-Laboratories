import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FoldersModule } from 'src/folders/folders.module';

@Module({
  imports: [DatabaseModule, FoldersModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
