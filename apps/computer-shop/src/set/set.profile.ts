import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Set } from './model/set.model';
import { GetSetResponseDto } from './dto/response/get-set-response.dto';

@Injectable()
export class SetProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, Set, GetSetResponseDto);
    };
  }
}
