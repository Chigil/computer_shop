import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PdfSaverService } from './pdf-saver.service';
import { PdfDataContract } from '../../../libs/common/src/contract/pdf-data-contract';

@Injectable()
export class MessagingServiceRpc {
  constructor(private readonly pdfSaverService: PdfSaverService) {}

  @RabbitRPC({
    exchange: 'pdf-service-rpc',
    routingKey: 'request-order-pdf',
    queue: 'pdf-queue-rpc',
  })
  public async rpcHandler(msg: PdfDataContract) {
    return { file: await this.pdfSaverService.generateOrderPdf(msg) };
  }
}
