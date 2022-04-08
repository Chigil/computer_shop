import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  public async create(dto: CreateOrderRequestDto) {
    const order = await this.orderRepository.create(dto);
    if (order) {
      return { id: order.id };
    }
    throw new HttpException('Not crated', HttpStatus.BAD_REQUEST)
  }

  public async getAll() {
    const orders = await this.orderRepository.findAll({
      include: { all: true },
    });
    return orders;
  }

  public async getOne(id: string) {
    const order = await this.orderRepository.findByPk(id);
    if (!order) {
      return new NotFoundException('order', id);
    }
  }

  public async update(id: string, dto: CreateOrderRequestDto) {
    const order = await this.orderRepository.findByPk(id);
    await order.update(dto);
    await order.save();
    return order;
  }

  public async delete(id: string) {
    const deleted = await this.orderRepository.destroy({ where: { id: id } });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
