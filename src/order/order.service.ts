import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {
  }

  async createOrder(dto: CreateOrderRequestDto) {
    const order = await this.orderRepository.create(dto);
    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.findAll({ include: { all: true } });
    return orders;
  }

  async getOneOrder(id: string) {
    const order = await this.orderRepository.findByPk(id);
    return order;
  }

  async updateOrder(id: string, dto: CreateOrderRequestDto) {
    const order = await this.orderRepository.findByPk(id);
    await order.update(dto);
    await order.save();
    return order;
  }

  async deleteOrder(id: string) {
    await this.orderRepository.destroy({ where: { id: id } });
    return { message: `order witch id = ${id} deleted` };
  }
}
