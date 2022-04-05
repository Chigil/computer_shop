import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { Discount } from './model/discount.model';
import { CreateDiscountDto } from './dto/create-discount.dto';

@ApiTags('Скидка')
@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {
  }

  @ApiOperation({ summary: 'Создание скидки' })
  @ApiResponse({ status: 200, type: Discount })
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.createDiscount(createDiscountDto);
  }

  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: [Discount] })
  @Get()
  getAll() {
    return this.discountService.getAllDiscounts();
  }

  @ApiOperation({ summary: 'Получение одной скидки по айди' })
  @ApiResponse({ status: 200, type: Discount })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.discountService.getOneDiscount(id);
  }

  @ApiOperation({ summary: 'Обновление скидки' })
  @ApiResponse({ status: 200, type: Discount })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: CreateDiscountDto) {
    return this.discountService.updateDiscount(id, updateDiscountDto);
  }

  @ApiOperation({ summary: 'Удаление скидки' })
  @ApiResponse({ status: 200, type: '{message: \'Удалено\'}' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.discountService.deleteDiscount(id);
  }
}
