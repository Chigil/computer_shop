import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Order } from './model/order.model';
import { GetOrderResponseDto } from './dto/response/get-order-response.dto';
import { CreateOrderResponseDto } from './dto/response/create-order-response.dto';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';

@Injectable()
export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, Order, GetOrderResponseDto);
      createMap(mapper, Order, CreateOrderRequestDto);
      createMap(mapper, Order, CreateOrderResponseDto);
    };
  }
}
