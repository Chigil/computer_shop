import { Module } from '@nestjs/common';
import { PdfSaverController } from './pdf-saver.controller';
import { PdfSaverService } from './pdf-saver.service';
import { ConfigModule } from '@nestjs/config';
import { rabbitConfig } from '../../../libs/common/src/rabbit-config/rabbit-config';

@Module({
  imports: [
    rabbitConfig(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    })],
  controllers: [PdfSaverController],
  providers: [PdfSaverService],
})
export class PdfSaverModule {
}
