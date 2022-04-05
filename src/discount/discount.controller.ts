import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { Discount } from './model/discount.model';
import { CreateDiscountDto } from './dto/create-discount.dto';

@ApiTags('Скидка')
@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @ApiOperation({ summary: 'Создание скидки' })
  @ApiResponse({ status: 201, type: Discount })
  @Post()
  private create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: [Discount] })
  @Get()
  private getAll() {
    return this.discountService.getAll();
  }

  @ApiOperation({ summary: 'Получение одной скидки по айди' })
  @ApiResponse({ status: 200, type: Discount })
  @Get(':id')
  private getOne(@Param('id') id: string) {
    return this.discountService.getOne(id);
  }

  @ApiOperation({ summary: 'Обновление скидки' })
  @ApiResponse({ status: 200, type: Discount })
  @Patch(':id')
  private update(
    @Param('id') id: string,
    @Body() updateDiscountDto: CreateDiscountDto,
  ) {
    return this.discountService.update(id, updateDiscountDto);
  }

  @ApiOperation({ summary: 'Удаление скидки' })
  @ApiResponse({ status: 200, type: '{ success: true }' })
  @Delete(':id')
  private delete(@Param('id') id: string) {
    return this.discountService.delete(id);
  }
}
