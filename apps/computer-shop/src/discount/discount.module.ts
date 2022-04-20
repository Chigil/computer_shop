import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { Discount } from './model/discount.model';
import { DiscountProfile } from './discount.profile';
import { LoyaltyProgram } from '../loyalty-program/model/loyalty-program.model';

@Module({
  providers: [DiscountService, DiscountProfile],
  controllers: [DiscountController],
  imports: [SequelizeModule.forFeature([Discount, LoyaltyProgram])],
  exports: [DiscountService],
})
export class DiscountModule {}
