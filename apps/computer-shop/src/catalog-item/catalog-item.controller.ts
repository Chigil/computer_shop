import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogItemService } from './catalog-item.service';
import { CatalogItem } from './model/catalog-item.model';
import { MapInterceptor } from '@automapper/nestjs';
import { GetCatalogItemResponseDto } from './dto/response/get-catalog-item-response.dto';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { CreateCatalogItemRequestDto } from './dto/request/create-catalog-item-request.dto';
import { CreateCatalogItemResponseDto } from './dto/response/create-catalog-item-response.dto';
import { GetCatalogItemRequestDto } from './dto/request/get-catalog-item-request.dto';

@Controller('catalog-item')
@ApiTags('Catalog Item')
export class CatalogItemController {
  constructor(private catalogItemService: CatalogItemService) {}

  @ApiOperation({ summary: 'Create catalog item' })
  @ApiResponse({ status: 201, type: CreateCatalogItemResponseDto })
  @Post()
  @UseInterceptors(MapInterceptor(CatalogItem, CreateCatalogItemResponseDto))
  private create(
    @Body() createCatalogItemRequestDto: CreateCatalogItemRequestDto,
  ): Promise<CreateCatalogItemResponseDto> {
    return this.catalogItemService.create(createCatalogItemRequestDto);
  }
  @ApiOperation({ summary: 'Get all catalog item' })
  @ApiResponse({ status: 200, type: [GetCatalogItemResponseDto] })
  @UseInterceptors(
    MapInterceptor(CatalogItem, GetCatalogItemResponseDto, { isArray: true }),
  )
  @Post('all')
  private getAll(@Body() getCatalogItemDto: GetCatalogItemRequestDto) {
    return this.catalogItemService.getAll(getCatalogItemDto);
  }

  @ApiOperation({ summary: 'Get one catalog item by id' })
  @ApiResponse({ status: 200, type: GetCatalogItemResponseDto })
  @Get(':id')
  @UseInterceptors(MapInterceptor(CatalogItem, GetCatalogItemResponseDto))
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.catalogItemService.getOne(id);
  }

  @ApiOperation({ summary: 'Update catalog item' })
  @ApiResponse({ status: 201, type: CatalogItem })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCatalogItemDto: CreateCatalogItemRequestDto,
  ): Promise<CreateCatalogItemResponseDto> {
    return this.catalogItemService.update(id, updateCatalogItemDto);
  }

  @ApiOperation({ summary: 'Delete catalog item' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.catalogItemService.delete(id);
  }
}
