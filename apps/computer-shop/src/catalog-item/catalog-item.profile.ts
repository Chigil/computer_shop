import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetCatalogItemResponseDto } from './dto/response/get-catalog-item-response.dto';
import { CatalogItem } from './model/catalog-item.model';

@Injectable()
export class CatalogItemProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper) => {
      createMap(mapper, CatalogItem, GetCatalogItemResponseDto);
    };
  }
}
