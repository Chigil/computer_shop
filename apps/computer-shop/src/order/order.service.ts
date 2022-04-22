import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { search } from '../../../../libs/common/src/utility/search';
import { paginate } from '../../../../libs/common/src/utility/paginate';
import { sort } from '../../../../libs/common/src/utility/sort';
import { GetOrderDto } from './dto/request/get-order.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order,
  private userService: UserService) {}

  public async create(dto: CreateOrderRequestDto) {
    const order = await this.orderRepository.create(dto.userId);
    const user = await this.userService.getOne(dto.userId);
    console.log(dto.items)
    const totalPrice = dto.items.reduce((n, {price}) => +n + +price, 0)
    // await order.$set('user', user);
    // await order.$set('totalPrice', totalPrice);
    // await order.$set('status', status);

    if (order) {
      return { id: order.id };
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }

  public async getAll(body: GetOrderDto) {
    const orders = await this.orderRepository.findAll({
      include: { all: true, nested: true },
      where: search(body.filter),
      ...paginate(body.pagination),
      ...sort(body.sorting),
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
    // find status on Id and check
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
