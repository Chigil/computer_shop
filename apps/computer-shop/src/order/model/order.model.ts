import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/model/user.model';
import { DataTypes } from 'sequelize';
import { Discount } from '../../discount/model/discount.model';

interface OrderCreationAttributes {
  userId: string;
  discountId: string;
  roleId: string;
  statusId: string;
  totalPrice: number;
  items: string;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @BelongsTo(() => User, 'userId')
  user: string;


  @BelongsTo(() => Discount, 'discountId')
  discount: string;

  //@BelongsTo( () => Status, 'statusId')
  status: string;

  @ApiProperty({ example: 2391.55, description: 'Общая цена заказа' })
  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 2 })
  total_price: number;

  @Column({ type: DataType.STRING, allowNull: true })
  items: string;
}
