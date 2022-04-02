import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Товар')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200, type: Product })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Получение всех товаров' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'Получение одного товара по айди' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.getOneProduct(id);
  }

  @ApiOperation({ summary: 'Обновление товара' })
  @ApiResponse({ status: 200, type: Product })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({ status: 200, type: '{message: \'Удалено\'}' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}


