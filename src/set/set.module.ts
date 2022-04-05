import { Module } from '@nestjs/common';
import { SetService } from './set.service';
import { SetController } from './set.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Set } from './model/set.model';

@Module({
  providers: [SetService],
  controllers: [SetController],
  imports: [
    SequelizeModule.forFeature([Set]),
  ],
})
export class SetModule {
}
