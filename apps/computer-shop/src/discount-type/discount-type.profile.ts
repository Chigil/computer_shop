import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetDiscountTypeResponseDto } from './dto/response/get-discount-type-response.dto';
import { CreateDiscountTypeRequestDto } from './dto/request/create-discount-type-request.dto';
import { CreateDiscountTypeResponseDto } from './dto/response/create-discount-type-response.dto';
import { DiscountType } from './model/discount-type.model';

@Injectable()
export class DiscountTypeProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, DiscountType, GetDiscountTypeResponseDto);
      createMap(mapper, DiscountType, CreateDiscountTypeRequestDto);
      createMap(mapper, DiscountType, CreateDiscountTypeResponseDto);
    };
  }
}
