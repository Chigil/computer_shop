import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';


@ApiTags('Заказ')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({ status: 200, type: Order })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getAll() {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({ summary: 'Получение одного заказа по айди' })
  @ApiResponse({ status: 200, type: Order })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.orderService.getOneOrder(id);
  }

  @ApiOperation({ summary: 'Обновление заказа' })
  @ApiResponse({ status: 200, type: Order })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @ApiResponse({ status: 200, type: '{message: \'Удалено\'}' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
