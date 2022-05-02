import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PdfSaverService } from './pdf-saver.service';
import { PdfSaverPublisher } from './pdf-saver.publisher';
import { PdfDataContract } from '../../../libs/common/src/contract/pdf-data-contract';

@Injectable()
export class MessagingServicePubSub {
  constructor(
    private readonly pdfSaverService: PdfSaverService,
    private readonly pdfSaverPublisher: PdfSaverPublisher,
  ) {}

  @RabbitSubscribe({
    exchange: 'pdf-service',
    routingKey: 'request-order-pdf',
    queue: 'pdf-queue',
  })
  public async pdfConsumer(msg: PdfDataContract) {
    const file = await this.pdfSaverService.generateOrderPdf(msg);
    const { exchange, routingKey, number } = msg;
    return this.pdfSaverPublisher.publishResponse(
      exchange,
      routingKey,
      file,
      number,
    );
  }
}
