import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  FileResponse,
  PdfDataContract,
} from '../../../../libs/common/src/contract/pdf-data-contract';

@Injectable()
export class OrderPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async requestOrderPdf(data: PdfDataContract) {
    return this.amqpConnection.publish('pdf-service', 'request-order-pdf', {
      ...data,
      exchange: 'main-service',
      routingKey: 'response-order-pdf',
    });
  }

  public async requestOrderPdfRpc(data: PdfDataContract) {
    return await this.amqpConnection.request<FileResponse>({
      exchange: 'pdf-service-rpc',
      routingKey: 'request-order-pdf',
      payload: {
        ...data,
      },
      timeout: 10000,
    });
  }
}
