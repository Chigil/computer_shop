import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

export const rabbitConfig = () =>
  RabbitMQModule.forRoot(RabbitMQModule, {
    exchanges: [
      {
        name: 'main-service',
        type: 'direct',
      },
      {
        name: 'pdf-service',
        type: 'direct',
      },
      {
        name: 'main-service-rpc',
        type: 'direct',
      },
      {
        name: 'pdf-service-rpc',
        type: 'direct',
      },
    ],
    uri: process.env.RABBIT_MQ_URI || 'amqp://guest:guest@localhost:5672' ,
  });
