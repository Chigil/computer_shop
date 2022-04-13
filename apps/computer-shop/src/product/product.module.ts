import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { Set } from '../set/model/set.model';
import { ProductSet } from './model/product-set.model';
import { CatalogItem } from '../catalog-item/model/catalog-item.model';
import { CatalogItemModule } from '../catalog-item/catalog-item.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [SequelizeModule.forFeature([Product, Set, ProductSet, CatalogItem]), CatalogItemModule],
})
export class ProductModule {}
