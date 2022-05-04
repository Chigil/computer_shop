import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PdfSaverService } from './pdf-saver.service';
import { PdfSaverPublisher } from './pdf-saver.publisher';
import {
  FileResponse,
  PdfDataContract,
} from '../../../libs/common/src/contract/pdf-data-contract';

@Injectable()
export class MessagingService {
  constructor(
    private readonly pdfSaverService: PdfSaverService,
    private readonly pdfSaverPublisher: PdfSaverPublisher,
  ) {}

  @RabbitSubscribe({
    exchange: 'pdf-service',
    routingKey: 'request-order-pdf',
    queue: 'pdf-queue',
  })
  public async pdfConsumer(message: PdfDataContract) {
    const file: FileResponse = await this.pdfSaverService.generateOrderPdf(
      message,
    );
    const { exchange, routingKey, orderId } = message;
    return this.pdfSaverPublisher.publishResponse(
      exchange,
      routingKey,
      file.filename,
      orderId,
    );
  }

  @RabbitRPC({
    exchange: 'pdf-service-rpc',
    routingKey: 'request-order-pdf',
    queue: 'pdf-queue-rpc',
  })
  public async rpcHandler(msg: PdfDataContract) {
    return this.pdfSaverService.generateOrderPdf(msg);
  }
}
