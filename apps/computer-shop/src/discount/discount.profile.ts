import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetDiscountResponseDto } from './dto/response/get-discount-response.dto';
import { CreateDiscountRequestDto } from './dto/request/create-discount-request.dto';
import { CreateDiscountResponseDto } from './dto/response/create-discount-response.dto';
import { Discount } from './model/discount.model';

@Injectable()
export class DiscountProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, Discount, GetDiscountResponseDto);
      createMap(mapper, Discount, CreateDiscountRequestDto);
      createMap(mapper, Discount, CreateDiscountResponseDto);
    };
  }
}
