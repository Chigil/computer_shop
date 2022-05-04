import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Set } from './model/set.model';
import { GetSetResponseDto } from './dto/response/get-set-response.dto';
import { CreateSetResponseDto } from './dto/response/create-set-response.dto';
import { CreateSetRequestDto } from './dto/request/create-set-request.dto';

@Injectable()
export class SetProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, Set, GetSetResponseDto);
      createMap(mapper, Set, CreateSetRequestDto);
      createMap(mapper, Set, CreateSetResponseDto);
    };
  }
}
