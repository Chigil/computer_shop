import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productRepository: typeof Product) {
  }

  async createProduct(dto: CreateProductDto) {
    const product = await this.productRepository.create(dto);
    return product;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll({ include: { all: true } });
    return products;
  }

  async getOneProduct(id: string) {
    const product = await this.productRepository.findByPk(id);
    return product;
  }

  async updateProduct(id: string, dto: CreateProductDto) {
    const product = await this.productRepository.findByPk(id);
    await product.update(dto);
    await product.save();
    return product;
  }

  async deleteProduct(id: string) {
    await this.productRepository.destroy({ where: { id: id } });
    return { message: `product witch id = ${id} deleted` };
  }
}
