import { Module } from '@nestjs/common';
import { CommonLibraryService } from './common-library.service';

@Module({
  providers: [CommonLibraryService],
  exports: [CommonLibraryService],
})
export class CommonLibraryModule {}
