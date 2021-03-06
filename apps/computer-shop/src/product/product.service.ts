import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductRequestDto } from './dto/request/create-product-request.dto';
import { Product } from './model/product.model';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { CreateProductResponseDto } from './dto/response/create-product-response.dto';
import { GetProductsDto } from './dto/request/get-products.dto';
import { paginate } from '../../../../libs/common/src/utility/paginate';
import { sort } from '../../../../libs/common/src/utility/sort';
import { search } from '../../../../libs/common/src/utility/search';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  public async create(
    dto: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    const product = await this.productRepository.create(dto);
    if (product) {
      return product;
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }

  public async getAll(body: GetProductsDto) {
    const products = await this.productRepository.findAll({
      where: search(body.filter),
      ...paginate(body.pagination),
      ...sort(body.sorting),
    });
    return products;
  }

  public async getOne(id: string) {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new NotFoundException('product', id);
    }
    return product;
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

  public async findAllById(ids: string[]) {
    return await this.productRepository.findAll({
      where: {
        id: ids,
      },
    });
  }
}
