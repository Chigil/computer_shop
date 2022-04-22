import { Module } from '@nestjs/common';
import { SetService } from './set.service';
import { SetController } from './set.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Set } from './model/set.model';
import { SetProfile } from './set.profile';

@Module({
  providers: [SetService, SetProfile],
  controllers: [SetController],
  imports: [SequelizeModule.forFeature([Set])],
  exports: [SetService]
})
export class SetModule {}
