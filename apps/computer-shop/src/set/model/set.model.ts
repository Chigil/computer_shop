import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from '../../product/model/product.model';
import { AutoMap } from '@automapper/classes';

interface SetCreationAttributes {
  name: string;
  description: string;
  price: number;
  amount: number;
}

@Table({ tableName: 'set', underscored: true })
export class Set extends Model<Set, SetCreationAttributes> {
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

  @BelongsToMany(() => Product, 'product_set', 'setId', 'productId')
  @AutoMap( () => Product)
  products: Product[];
}
