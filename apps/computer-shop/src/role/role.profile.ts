import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { CreateRoleRequestDto } from './dto/request/create-role-request.dto';
import { Role } from './model/role.model';

@Injectable()
export class RoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, Role, CreateRoleRequestDto);
    };
  }
}
