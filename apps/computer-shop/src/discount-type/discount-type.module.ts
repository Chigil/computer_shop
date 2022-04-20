import { Module } from '@nestjs/common';
import { DiscountTypeService } from './discount-type.service';
import { DiscountTypeController } from './discount-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountType } from './model/discount-type.model';
import { DiscountTypeProfile } from './discount-type.profile';

@Module({
  providers: [DiscountTypeService, DiscountTypeProfile],
  controllers: [DiscountTypeController],
  imports: [SequelizeModule.forFeature([DiscountType])],
})
export class DiscountTypeModule {}
