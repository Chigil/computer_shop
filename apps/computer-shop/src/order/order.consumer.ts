import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Public } from '../../../../libs/common/src/decorators/public.decorators';
import { OrderService } from './order.service';
import { PdfResponseContract } from '../../../../libs/common/src/contract/pdf-data-contract';

@Injectable()
@Public()
export class OrderConsumerService {
  constructor(private readonly orderService: OrderService) {}

  @RabbitSubscribe({
    exchange: 'main-service',
    routingKey: 'response-order-pdf',
    queue: 'main-queue',
  })
  public async orderConsumerPubSub(msg: PdfResponseContract) {
    const { id, file } = msg;
    await this.orderService.writeFile(id, file.filename);
  }
}
