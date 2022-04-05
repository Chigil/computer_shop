import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { Role } from './role/role.model';
import { RoleModule } from './role/role.module';
import { Product } from './product/product.model';
import { ProductModule } from './product/product.module';
import { ProductSet } from './product/product-set.model';
import { Set } from './set/set.model';
import { SetModule } from './set/set.module';
import { Order } from './order/order.model';
import { OrderModule } from './order/order.module';
import { LoyaltyProgram } from './loyalty-program/loyalty-program.model';
import { LoyaltyProgramModule } from './loyalty-program/loyalty-program.module';
import { Discount } from './discount/discount.model';
import { DiscountType } from './discount-type/discount-type.model';
import { DiscountModule } from './discount/discount.module';
import { DiscountTypeModule } from './discount-type/discount-type.module';
import { CatalogItemModule } from './catalog-item/catalog-item.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Product, Set, ProductSet, Order, LoyaltyProgram, Discount, DiscountType],
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    ProductModule,
    SetModule,
    OrderModule,
    LoyaltyProgramModule,
    DiscountModule,
    DiscountTypeModule,
    CatalogItemModule,
  ],
})
export class AppModule {

}
