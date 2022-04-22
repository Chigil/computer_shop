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
import { ProductService } from './product.service';
import { Product } from './model/product.model';
import { CreateProductRequestDto } from './dto/request/create-product-request.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { CreateProductResponseDto } from './dto/response/create-product-response.dto';
import { GetProductsDto } from './dto/request/get-products.dto';
import { Role } from '../../../../libs/common/src/decorators/roles-auth.decorators';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { GetProductResponseDto } from './dto/response/get-product-response.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, type: CreateProductResponseDto })
  @UseInterceptors(MapInterceptor(Product, CreateProductResponseDto))
  @Role('ADMIN')
  @Post()
  private create(
    @Body() createProductDto: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [GetProductResponseDto] })
  @UseInterceptors(
    MapInterceptor(Product, GetProductResponseDto, { isArray: true }),
  )
  @Post('all')
  private getAll(@Body() getProductsDto: GetProductsDto) {
    return this.productService.getAll(getProductsDto);
  }

  @ApiOperation({ summary: 'Get one product by id' })
  @ApiResponse({ status: 200, type: GetProductResponseDto })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getOne(id);
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, type: GetProductResponseDto })
  @Patch(':id')
  @Role('ADMIN')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: CreateProductRequestDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Role('ADMIN')
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.delete(id);
  }
}
