import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductSet } from '../../product/model/product-set.model';
import { DataTypes } from 'sequelize';
import { Product } from '../../product/model/product.model';

interface SetCreationAttributes {
  name: string;
  description: string;
  price: number;
  amount: number;
}

@Table({ tableName: 'set' })
export class Set extends Model<Set, SetCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  amount: number;

  //@BelongsTo( () => Catalog, 'catalogId')
  catalog: string;

  @BelongsToMany(() => Product, () => ProductSet)
  products: Product[];
}
