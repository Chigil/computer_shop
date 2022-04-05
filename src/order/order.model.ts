import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from '../role/role.model';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { DataTypes } from 'sequelize';
import { Discount } from '../discount/discount.model';

interface OrderCreationAttributes {
  user_id: string;
  discount_id: string;
  role_id: number;
  status_id: string;
  total_price: number;
  items: string;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderCreationAttributes> {
  @Column({ type: DataType.UUID, unique: true, defaultValue: DataTypes.UUIDV4, primaryKey: true })
  id: string;

  @ForeignKey(() => User)
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Пользователь' })
  @BelongsTo(() => User, 'user_id')
  user: string;


  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Скидка' })
  @BelongsTo(() => Discount, 'discount_id')
  discount: string;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Статус заказа',
  })
    //@BelongsTo( () => Status, 'status_id')
  status: string;

  @ApiProperty({ example: 2391.55, description: 'Общая цена заказа' })
  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 2 })
  total_price: number;

  @ApiProperty({ example: 'Оперативная память, Материнская плата', description: 'Товары заказа' })
  @Column({ type: DataType.STRING, allowNull: true })
  items: string;

}