import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './model/discount.model';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { NotFoundException } from '../library/exeption/not-found.exception';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount) private discountRepository: typeof Discount) {
  }

  public async create(dto: CreateDiscountDto) {
    const discount = await this.discountRepository.create(dto);
    if (discount) {
      return { id: discount.id };
    }
  }

  public async getAll() {
    const discounts = await this.discountRepository.findAll({ include: { all: true } });
    return discounts;
  }

  public async getOne(id: string) {
    const discount = await this.discountRepository.findByPk(id);
    if (!discount) {
      return new NotFoundException('discount', id);
    }
    return discount;
  }

  public async update(id: string, dto: CreateDiscountDto) {
    const discount = await this.discountRepository.findByPk(id);
    await discount.update(dto);
    await discount.save();
    return discount;
  }

  public async delete(id: string) {
    const deleted = await this.discountRepository.destroy({ where: { id: id } });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
