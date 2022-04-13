import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatalogItemController } from './catalog-item.controller';
import { CatalogItemService } from './catalog-item.service';
import { CatalogItem } from './model/catalog-item.model';

@Module({
  controllers: [CatalogItemController],
  providers: [CatalogItemService],
  imports: [SequelizeModule.forFeature([CatalogItem])],
})
export class CatalogItemModule {}
