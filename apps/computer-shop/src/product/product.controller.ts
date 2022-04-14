import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './model/product.model';
import { CreateProductRequestDto } from './dto/request/create-product-request.dto';

@ApiTags('Товар')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 201, type: Product })
  @Post()
  private create(@Body() createProductDto: CreateProductRequestDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Получение всех товаров' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  private getAll() {
    return this.productService.getAll();
  }

  @ApiOperation({ summary: 'Получение одного товара по айди' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getOne(id);
  }

  @ApiOperation({ summary: 'Обновление товара' })
  @ApiResponse({ status: 200, type: Product })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: CreateProductRequestDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({ status: 200, type: '{ success: false }' })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.delete(id);
  }
}
