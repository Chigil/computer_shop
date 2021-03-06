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
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';
import { Order } from './model/order.model';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { GetOrderDto } from './dto/request/get-order.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { GetOrderResponseDto } from './dto/response/get-order-response.dto';
import { CreateOrderResponseDto } from './dto/response/create-order-response.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, type: CreateOrderResponseDto })
  @UseInterceptors(MapInterceptor(Order, CreateOrderResponseDto))
  @Post()
  private create(@Body() createOrderDto: CreateOrderRequestDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all order' })
  @ApiResponse({ status: 200, type: [GetOrderResponseDto] })
  @UseInterceptors(
    MapInterceptor(Order, GetOrderResponseDto, { isArray: true }),
  )
  @Post('all')
  private getAll(@Body() getOrderDto: GetOrderDto) {
    return this.orderService.getAll(getOrderDto);
  }

  @ApiOperation({ summary: 'Get one order by id' })
  @UseInterceptors(MapInterceptor(Order, GetOrderResponseDto))
  @ApiResponse({ status: 200, type: GetOrderResponseDto })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.getOne(id);
  }

  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, type: CreateOrderResponseDto })
  @UseInterceptors(MapInterceptor(Order, CreateOrderResponseDto))
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: CreateOrderRequestDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.delete(id);
  }

  @ApiOperation({ summary: 'Get one order by id' })
  @Get('/save/:id')
  async saveOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.savePdf(id);
  }

  @ApiOperation({ summary: 'Get one order by id' })
  @Get('/save/rpc/:id')
  async saveOrderRpc(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.savePdfRpc(id);
  }
}
