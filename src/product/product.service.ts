import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductRequestDto } from './dto/request/create-product-request.dto';
import { Product } from './model/product.model';
import { NotFoundException } from '../library/exeption/not-found.exception';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  public async create(dto: CreateProductRequestDto) {
    const product = await this.productRepository.create(dto);
    if (product) {
      return { id: product.id };
    }
  }

  public async getAll() {
    const products = await this.productRepository.findAll({
      include: { all: true },
    });
    return products;
  }

  public async getOne(id: string) {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      return new NotFoundException('product', id);
    }
  }

  public async update(id: string, dto: CreateProductRequestDto) {
    const product = await this.productRepository.findByPk(id);
    await product.update(dto);
    await product.save();
    return product;
  }

  public async delete(id: string) {
    const deleted = await this.productRepository.destroy({ where: { id: id } });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
