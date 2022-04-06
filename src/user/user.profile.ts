import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetUserResponseDto } from './dto/response/get-user-response.dto';
import { User } from './model/user.model';
import { CamelCaseNamingConvention, createMap, namingConventions, SnakeCaseNamingConvention } from '@automapper/core';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, User, GetUserResponseDto, namingConventions(new CamelCaseNamingConvention()));
      createMap(mapper, User, CreateUserRequestDto);
      createMap(mapper, User, CreateUserResponseDto);
    };
  }
}