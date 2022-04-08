import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';
import { Order } from './model/order.model';

@ApiTags('Заказ')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({ status: 201, type: Order })
  @Post()
  private create(@Body() createOrderDto: CreateOrderRequestDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  private getAll() {
    return this.orderService.getAll();
  }

  @ApiOperation({ summary: 'Получение одного заказа по айди' })
  @ApiResponse({ status: 200, type: Order })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.getOne(id);
  }

  @ApiOperation({ summary: 'Обновление заказа' })
  @ApiResponse({ status: 200, type: Order })
  @Patch(':id')
  private update(
    @Param('id',  ParseUUIDPipe) id: string,
    @Body() updateOrderDto: CreateOrderRequestDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @ApiResponse({ status: 200, type: '{ success: false }' })
  @Delete(':id')
  private delete(@Param('id',  ParseUUIDPipe) id: string) {
    return this.orderService.delete(id);
  }
}
