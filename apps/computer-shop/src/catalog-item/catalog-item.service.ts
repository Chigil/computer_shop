import { Injectable } from '@nestjs/common';
import { GetProductsDto } from '../product/dto/request/get-products.dto';
import { search } from '../../../../libs/common/src/utility/search';
import { paginate } from '../../../../libs/common/src/utility/paginate';
import { sort } from '../../../../libs/common/src/utility/sort';
import { InjectModel } from '@nestjs/sequelize';
import { CatalogItem } from './model/catalog-item.model';

@Injectable()
export class CatalogItemService {
  constructor(
    @InjectModel(CatalogItem) private catalogItemRepository: typeof CatalogItem,
  ) {}

  public async getAll(body: GetProductsDto) {
    const items = await this.catalogItemRepository.findAll({
      include: { all: true },
      where: search(body.filter),
      ...paginate(body.pagination),
      ...sort(body.sorting),
    });
    return items;
  }
}
