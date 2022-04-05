import { Module } from '@nestjs/common';
import { DiscountTypeService } from './discount-type.service';
import { DiscountTypeController } from './discount-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountType } from './model/discount-type.model';

@Module({
  providers: [DiscountTypeService],
  controllers: [DiscountTypeController],
  imports: [SequelizeModule.forFeature([DiscountType])],
})
export class DiscountTypeModule {}
