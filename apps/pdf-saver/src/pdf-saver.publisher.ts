import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfSaverPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async publishResponse(
    exchange: string,
    routingKey: string,
    file: object,
    id: string,
  ) {
    return this.amqpConnection.publish(exchange, routingKey, { file, id });
  }
}
