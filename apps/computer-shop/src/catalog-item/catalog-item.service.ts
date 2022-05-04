import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { search } from '../../../../libs/common/src/utility/search';
import { paginate } from '../../../../libs/common/src/utility/paginate';
import { sort } from '../../../../libs/common/src/utility/sort';
import { InjectModel } from '@nestjs/sequelize';
import { CatalogItem } from './model/catalog-item.model';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { CreateCatalogItemRequestDto } from './dto/request/create-catalog-item-request.dto';
import { GetCatalogItemRequestDto } from './dto/request/get-catalog-item-request.dto';

@Injectable()
export class CatalogItemService {
  constructor(
    @InjectModel(CatalogItem) private catalogItemRepository: typeof CatalogItem,
  ) {}

  public async create(dto: CreateCatalogItemRequestDto) {
    const item = await this.catalogItemRepository.create(dto);
    if (item) {
      return item;
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }
  public async getAll(body: GetCatalogItemRequestDto) {
    const items = await this.catalogItemRepository.findAll({
      include: { all: true },
      where: search(body.filter),
      ...paginate(body.pagination),
      ...sort(body.sorting),
    });
    return items;
  }

  public async getOne(id: string) {
    const item = await this.catalogItemRepository.findByPk(id, {
      include: { all: true },
    });
    if (!item) {
      throw new NotFoundException('user', id);
    }
    return item;
  }

  public async update(id: string, dto) {
    const item = await this.catalogItemRepository.findByPk(id);
    await item.update(dto);
    await item.save();
    return item;
  }

  public async findAllById(ids: string[]) {
    return await this.catalogItemRepository.findAll({
      include: { all: true },
      where: {
        id: ids,
      },
    });
  }

  public async delete(id: string) {
    const deleted = await this.catalogItemRepository.destroy({
      where: { id: id },
    });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
