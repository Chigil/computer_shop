import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Status } from './model/status.model';
import { GetStatusResponseDto } from './dto/response/get-status-response.dto';

@Injectable()
export class StatusProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, Status, GetStatusResponseDto);
    };
  }
}
