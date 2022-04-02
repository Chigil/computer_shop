import { Module } from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service';
import { LoyaltyProgramController } from './loyalty-program.controller';

@Module({
  providers: [LoyaltyProgramService],
  controllers: [LoyaltyProgramController],
})
export class LoyaltyProgramModule {
}
