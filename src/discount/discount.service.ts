import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './discount.model';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount) private discountRepository: typeof Discount) {
  }

  async createDiscount(dto: CreateDiscountDto) {
    const discount = await this.discountRepository.create(dto);
    return discount;
  }

  async getAllDiscounts() {
    const discounts = await this.discountRepository.findAll({ include: { all: true } });
    return discounts;
  }

  async getOneDiscount(id: string) {
    const discount = await this.discountRepository.findByPk(id);
    return discount;
  }

  async updateDiscount(id: string, dto: CreateDiscountDto) {
    const discount = await this.discountRepository.findByPk(id);
    await discount.update(dto);
    await discount.save();
    return discount;
  }

  async deleteDiscount(id: string) {
    await this.discountRepository.destroy({ where: { id: id } });
    return { message: `discount witch id = ${id} deleted` };
  }
}
