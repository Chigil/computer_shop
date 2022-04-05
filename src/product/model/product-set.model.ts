import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Set } from '../../set/model/set.model';
import { Product } from './product.model';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'product_set', createdAt: false, updatedAt: false })
export class ProductSet extends Model<ProductSet> {

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Уникальный идентификатор комплекта товаров',
  })
  @Column({ type: DataType.UUID, unique: true, defaultValue: DataTypes.UUIDV4, primaryKey: true })
  id: string;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Уникальный идентификатор товара' })
  @Column({ type: DataType.UUID })
  product_id: string;

  @ForeignKey(() => Set)
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Уникальный идентификатор комплекта' })
  @Column({ type: DataType.UUID })
  set_id: string;
}