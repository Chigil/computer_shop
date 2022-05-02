import { Module } from '@nestjs/common';
import { PdfSaverController } from './pdf-saver.controller';
import { PdfSaverService } from './pdf-saver.service';
import { ConfigModule } from '@nestjs/config';
import { rabbitConfig } from '../../../libs/common/src/rabbit-config/rabbit-config';
import { MessagingServicePubSub } from './pdf-saver.consumer';
import { PdfSaverPublisher } from './pdf-saver.publisher';
import { MessagingServiceRpc } from './pdf-saver.consumer.prc';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    rabbitConfig(),
  ],
  controllers: [PdfSaverController],
  providers: [
    PdfSaverService,
    MessagingServicePubSub,
    MessagingServiceRpc,
    PdfSaverPublisher,
  ],
})
export class PdfSaverModule {}
