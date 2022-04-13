import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Set } from '../../set/model/set.model';
import { Product } from './product.model';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'product_set', createdAt: false, updatedAt: false, underscored: true })
export class ProductSet extends Model<ProductSet> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  productId: string;

  @ForeignKey(() => Set)
  @Column({ type: DataType.UUID })
  setId: string;
}
