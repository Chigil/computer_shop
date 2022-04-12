import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ProductSet } from './product-set.model';
import { DataTypes } from 'sequelize';
import { Set } from '../../set/model/set.model';

interface ProductCreationAttributes {
  name: string;
  description: string;
  price: number;
  amount: number;
}

@Table({ tableName: 'product' })
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

  //@BelongsTo( () => Catalog, 'catalogId')
  catalog: string;

  @BelongsToMany(() => Set, () => ProductSet)
  sets: Set;
}
