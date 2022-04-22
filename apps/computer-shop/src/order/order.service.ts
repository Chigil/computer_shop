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
import { Product } from '../product/model/product.model';
import { Set } from '../set/model/set.model';
import { SetService } from '../set/set.service';
import { ProductService } from '../product/product.service';
import { DiscountService } from '../discount/discount.service';
import { StatusService } from '../status/status.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderRepository: typeof Order,
    private userService: UserService,
    private discountService: DiscountService,
    private setService: SetService,
    private statusService: StatusService,
    private productService: ProductService,
  ) {}

  public async create(dto: CreateOrderRequestDto) {
    const order = await this.orderRepository.create(dto);
    if (order) {
      const discount = await this.discountService.getOne(dto.discountId);
      const user = await this.userService.getOne(dto.userId);
      const status = await this.statusService.getOne(dto.statusId);
      await order.$set('discount', discount.id);
      await order.$set('status', status.id);
      await order.$set('user', user.id);
      const price = await this.updatePrice(
        dto.sets,
        dto.products,
        discount.amount,
      );
      await order.update({ totalPrice: price });
      await order.save();
      return order;
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

  public async updatePrice(
    setId: string[],
    productIds: string[],
    discount?: number,
  ) {
    const set = await this.setService.findAllById(setId);
    const products = await this.productService.findAllById(productIds);
    return OrderService.calculatePrice(products, set, discount);
  }

  private static calculatePrice(
    products?: Product[],
    sets?: Set[],
    discount?: number,
  ) {
    const productsPrice = products.reduce((n, { price }) => n + price, 0);
    const setsPrice = sets.reduce((n, { price }) => n + price, 0);
    const totalPrice = productsPrice + setsPrice;
    if (discount) {
      const discountPrice = (totalPrice * discount) / 100;
      return totalPrice - discountPrice;
    }
    return totalPrice;
  }
}
