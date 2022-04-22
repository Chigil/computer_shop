import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Set } from './model/set.model';
import { CreateSetRequestDto } from './dto/request/create-set-request.dto';
import { search } from '../../../../libs/common/src/utility/search';
import { paginate } from '../../../../libs/common/src/utility/paginate';
import { sort } from '../../../../libs/common/src/utility/sort';
import { GetSetDto } from './dto/request/get-set.dto';
import { Product } from '../product/model/product.model';

@Injectable()
export class SetService {
  constructor(@InjectModel(Set) private setRepository: typeof Set) {}

  public async create(dto: CreateSetRequestDto) {
    const set = await this.setRepository.create(dto);
    if (set) {
      await this.updatePrice(set.id);
      return set;
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }

  public async getAll(body: GetSetDto) {
    const sets = await this.setRepository.findAll({
      include: { all: true, nested: true },
      where: search(body.filter),
      ...paginate(body.pagination),
      ...sort(body.sorting),
    });
    return sets;
  }

  public async getOne(id: string) {
    const set = await this.setRepository.findByPk(id);
    return set;
  }

  public async update(id: string, dto: CreateSetRequestDto) {
    const set = await this.setRepository.findByPk(id);
    await set.update(dto);
    await this.updatePrice(set.id);
    await set.save();
    return set;
  }

  public async delete(id: string) {
    const deleted = await this.setRepository.destroy({ where: { id: id } });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }

  public async findAllById(ids: string[]) {
    return await this.setRepository.findAll({
      where: {
        id: ids,
      },
    });
  }

  public async updatePrice(setId: string) {
    const set = await this.setRepository.findByPk(setId, {
      include: { all: true },
    });
    const totalPrice = SetService.calculatePrice(set.products);
    await set.update({ price: totalPrice });
    await set.save();
  }

  private static calculatePrice(products: Product[]) {
    return products.reduce((n, { price }) => n + price, 0);
  }
}
