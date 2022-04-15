import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductSet } from './product-set.model';
import { DataTypes } from 'sequelize';
import { Set } from '../../set/model/set.model';
import { AutoMap } from '@automapper/classes';

interface ProductCreationAttributes {
  name: string;
  description: string;
  price: number;
  amount: number;
}

@Table({ tableName: 'product', underscored: true })
export class Product extends Model<Product, ProductCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  @AutoMap()
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @AutoMap()
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @AutoMap()
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  @AutoMap()
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  @AutoMap()
  amount: number;

  @BelongsToMany(() => Set, () => ProductSet)
  @AutoMap()
  sets: Set;
}
