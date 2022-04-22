import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusController } from './status.controller';
import { Status } from './model/status.model';
import { StatusProfile } from './status.profle';

@Module({
  providers: [StatusService, StatusProfile],
  controllers: [StatusController],
  imports: [SequelizeModule.forFeature([Status])],
  exports: [StatusService]
})
export class StatusModule {}
