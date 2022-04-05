import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { Set } from '../set/model/set.model';
import { ProductSet } from './model/product-set.model';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    SequelizeModule.forFeature([Product, Set, ProductSet]),
  ],
})
export class ProductModule {
}
