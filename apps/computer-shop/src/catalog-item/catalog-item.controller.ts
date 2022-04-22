import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetProductsDto } from '../product/dto/request/get-products.dto';
import { CatalogItemService } from './catalog-item.service';
import { CatalogItem } from './model/catalog-item.model';
import { MapInterceptor } from '@automapper/nestjs';
import { GetCatalogItemResponseDto } from './dto/response/get-catalog-item-response.dto';

@Controller('catalog-item')
export class CatalogItemController {
  constructor(private catalogItemService: CatalogItemService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [CatalogItem] })
  @UseInterceptors(
    MapInterceptor(CatalogItem, GetCatalogItemResponseDto, { isArray: true }),
  )
  @Post('all')
  private getAll(@Body() getProductsDto: GetProductsDto) {
    return this.catalogItemService.getAll(getProductsDto);
  }
}
