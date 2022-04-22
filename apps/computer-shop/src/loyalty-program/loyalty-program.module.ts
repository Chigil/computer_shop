import { Module } from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service';
import { LoyaltyProgramController } from './loyalty-program.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoyaltyProgram } from './model/loyalty-program.model';
import { DiscountModule } from '../discount/discount.module';
import { LoyaltyProgramProfile } from './loyalty-program.profile';

@Module({
  providers: [LoyaltyProgramService, LoyaltyProgramProfile],
  controllers: [LoyaltyProgramController],
  imports: [SequelizeModule.forFeature([LoyaltyProgram]), DiscountModule],
})
export class LoyaltyProgramModule {}
