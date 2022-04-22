import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { LoyaltyProgram } from './model/loyalty-program.model';
import { GetLoyaltyProgramResponseDto } from './dto/response/get-loyalty-program-response.dto';

@Injectable()
export class LoyaltyProgramProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, LoyaltyProgram, GetLoyaltyProgramResponseDto);
    };
  }
}
