import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProfile } from './order.profile';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { SetModule } from '../set/set.module';
import { DiscountModule } from '../discount/discount.module';
import { StatusModule } from '../status/status.module';

@Module({
  providers: [OrderService, OrderProfile],
  controllers: [OrderController],
  imports: [
    SequelizeModule.forFeature([Order]),
    UserModule,
    ProductModule,
    SetModule,
    DiscountModule,
    StatusModule,
  ],
})
export class OrderModule {}
