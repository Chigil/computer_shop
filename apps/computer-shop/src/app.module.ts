import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/model/user.model';
import { Role } from './role/model/role.model';
import { RoleModule } from './role/role.module';
import { Product } from './product/model/product.model';
import { ProductModule } from './product/product.module';
import { Set } from './set/model/set.model';
import { SetModule } from './set/set.module';
import { Order } from './order/model/order.model';
import { OrderModule } from './order/order.module';
import { LoyaltyProgram } from './loyalty-program/model/loyalty-program.model';
import { LoyaltyProgramModule } from './loyalty-program/loyalty-program.module';
import { Discount } from './discount/model/discount.model';
import { DiscountType } from './discount-type/model/discount-type.model';
import { DiscountModule } from './discount/discount.module';
import { DiscountTypeModule } from './discount-type/discount-type.module';
import { CatalogItemModule } from './catalog-item/catalog-item.module';
import { AutomapperModule } from '@automapper/nestjs';
import { sequelize } from '@automapper/sequelize';
import {
  CamelCaseNamingConvention,
  SnakeCaseNamingConvention,
} from '@automapper/core';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthJwtGuard } from './auth/guards/auth.jwt.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { CatalogItem } from './catalog-item/model/catalog-item.model';
import { StatusModule } from './status/status.module';
import { Status } from './status/model/status.model';
import { rabbitConfig } from '../../../libs/common/src/rabbit-config/rabbit-config';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthJwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  imports: [
    rabbitConfig(),
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
      models: [
        User,
        Role,
        Product,
        Set,
        Order,
        LoyaltyProgram,
        Discount,
        DiscountType,
        CatalogItem,
        Status,
      ],
      autoLoadModels: false,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: sequelize(),
      namingConventions: {
        source: new CamelCaseNamingConvention(),
        destination: new SnakeCaseNamingConvention(),
      },
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
    AuthModule,
    StatusModule,
  ],
})
export class AppModule {}
