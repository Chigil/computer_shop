import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductSet } from './product-set.model';
import { DataTypes } from 'sequelize';
import { Set } from '../../set/model/set.model';
import { CatalogItem } from '../../catalog-item/model/catalog-item.model';

interface ProductCreationAttributes {
  name: string;
  description: string;
  price: number;
  amount: number;
}

@Table({ tableName: 'product',  underscored: true })
export class Product extends Model<Product, ProductCreationAttributes> {
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

  @BelongsTo( () => CatalogItem, 'catalogItemId')
  catalog: CatalogItem;

  @BelongsToMany(() => Set, () => ProductSet)
  sets: Set;
}
