import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
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
import { CatalogItemService } from '../catalog-item/catalog-item.service';
import { OrderPublisher } from './order.publisher';
import { PdfDataContract } from '../../../../libs/common/src/contract/pdf-data-contract';
import { createReadStream } from 'fs';

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
    private catalogItemService: CatalogItemService,
    private readonly orderPublisher: OrderPublisher,
  ) {}

  public async create(dto: CreateOrderRequestDto) {
    const order = await this.orderRepository.create();
    if (order) {
      const user = await this.userService.getOne(dto.userId);
      const catalogItem = await this.catalogItemService.findAllById(dto.items);
      const sets = [];
      const products = [];
      catalogItem.forEach((item) => {
        if (item.kit) {
          sets.push(item.kit);
        }
        if (item.product) {
          products.push(item.product);
        }
      });
      const price = await this.calculatePrice(sets, products, dto.discountId);

      if (dto.discountId) {
        await order.$set('discount', dto.discountId);
      }
      const status = await this.statusService.getOne(
        '1ae303b2-efe5-4e12-9db9-10cdb96a9567',
      );
      if (status) {
        await order.$set('status', status.id);
      }
      await order.$set('user', user.id);
      await order.$set('items', dto.items);

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
    const order = await this.orderRepository.findByPk(id, {
      include: { all: true },
    });
    if (!order) {
      throw new NotFoundException('order', id);
    }
    return order;
  }

  public async update(id: string, dto) {
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

  private async calculatePrice(
    products?: Product[],
    sets?: Set[],
    discountId?: string,
  ) {
    const productsPrice = products.reduce((n, { price }) => n + price, 0);
    const setsPrice = sets.reduce((n, { price }) => n + price, 0);
    const totalPrice = productsPrice + setsPrice;
    if (discountId) {
      const { amount } = await this.discountService.getOne(discountId);
      const discountPrice = (totalPrice * amount) / 100;
      return totalPrice - discountPrice;
    }
    return totalPrice;
  }

  public async savePdf(id: string) {
    const data = await this.orderRepository.findByPk(id, {
      include: { all: true },
    });
    if (data.orderFile) {
      const file = createReadStream(data.orderFile);
      return new StreamableFile(file);
    }
    const result: PdfDataContract = {
      orderId: data.id,
      price: data.totalPrice,
      items: data.items,
      userEmail: data.user.email,
      userId: data.user.id,
    };
    return this.orderPublisher.requestOrderPdf(result);
  }

  public async savePdfRpc(id: string) {
    const data = await this.orderRepository.findByPk(id, {
      include: { all: true },
    });
    if (data.orderFile) {
      const file = createReadStream(data.orderFile);
      return new StreamableFile(file);
    }
    const result: PdfDataContract = {
      orderId: data.id,
      price: data.totalPrice,
      items: data.items,
      userEmail: data.user.email,
      userId: data.user.id,
    };
    const response = await this.orderPublisher.requestOrderPdfRpc(result);
    const { filename } = response;
    await this.writeFile(id, filename);
  }

  public async writeFile(id: string, filename: string) {
    const order = await this.orderRepository.findByPk(id);
    await order.update({
      orderFile: filename,
    });
  }
}
