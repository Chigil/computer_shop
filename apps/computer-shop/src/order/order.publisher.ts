import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PdfDataContractRequest } from '../../../../libs/common/src/contract/pdf-data-contract';

@Injectable()
export class OrderPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async requestOrderPdf(data: PdfDataContractRequest) {
    return this.amqpConnection.publish('pdf-service', 'request-order-pdf', {
      number: data.id,
      price: data.totalPrice,
      items: data.items,
      userEmail: data.user.email,
      userId: data.user.id,
      exchange: 'main-service',
      routingKey: 'response-order-pdf',
    });
  }
}
