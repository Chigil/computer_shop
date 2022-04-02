import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from '../role/role.model';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { DataTypes } from 'sequelize';

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
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Уникальный идентификатор клиента' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  user_id: string;

  //@ForeignKey(() => DiscountType)
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Уникальный идентификатор скидки' })
  @Column({ type: DataType.STRING, allowNull: false })
  discount_id: string;

  //@ForeignKey(() => OrderStatus)
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Уникальный идентификатор статуса заказа',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  status_id: string;

  @ApiProperty({ example: 2391.55, description: 'Общая цена заказа' })
  @ForeignKey(() => Role)
  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 2 })
  total_price: number;

  @ApiProperty({ example: 'Оперативная память, Материнская плата', description: 'Товары заказа' })
  @Column({ type: DataType.STRING, allowNull: true })
  items: string;

}