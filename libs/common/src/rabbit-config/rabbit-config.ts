import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

export const rabbitConfig = () => RabbitMQModule.forRoot(RabbitMQModule, {
  exchanges: [
    {
      name: 'exchange1',
      type: 'topic',
    },
  ],
  uri: 'amqp://guest:guest@localhost:5672',
  channels: {
    'channel-1': {
      prefetchCount: 15,
      default: true,
    },
    'channel-2': {
      prefetchCount: 2,
    },
  },
})