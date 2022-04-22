import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatalogItemController } from './catalog-item.controller';
import { CatalogItemService } from './catalog-item.service';
import { CatalogItem } from './model/catalog-item.model';
import { CatalogItemProfile } from './catalog-item.profile';

@Module({
  controllers: [CatalogItemController],
  providers: [CatalogItemService, CatalogItemProfile],
  imports: [SequelizeModule.forFeature([CatalogItem])],
})
export class CatalogItemModule {}
