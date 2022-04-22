import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { DataTypes } from 'sequelize';
import { Discount } from '../../discount/model/discount.model';
import { CatalogItem } from '../../catalog-item/model/catalog-item.model';
import { Status } from '../../status/model/status.model';
import { AutoMap } from '@automapper/classes';

interface OrderCreationAttributes {
  userId: string;
  discountId: string;
  roleId: string;
  statusId: string;
  totalPrice: number;
  items: CatalogItem;
}

@Table({ tableName: 'order', underscored: true })
export class Order extends Model<Order, OrderCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  @AutoMap()
  id: string;

  @ForeignKey(() => User)
  @BelongsTo(() => User, 'userId')
  @AutoMap(() => User)
  user: User;

  @BelongsTo(() => Discount, 'discountId')
  @AutoMap(() => Discount)
  discount: Discount;

  @BelongsTo(() => Status, 'statusId')
  @AutoMap(() => Status)
  status: Status;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  @AutoMap()
  totalPrice: number;

  @BelongsToMany(
    () => CatalogItem,
    'order_catalog_item',
    'order_id',
    'catalog_item',
  )
  @AutoMap(() => CatalogItem)
  items: CatalogItem[];
}
