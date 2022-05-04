import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from '../../product/model/product.model';
import { Set } from '../../set/model/set.model';
import { AutoMap } from '@automapper/classes';

interface CatalogItemCreationAttributes {
  title: string;
}

@Table({ tableName: 'catalog_item', underscored: true })
export class CatalogItem extends Model<
  CatalogItem,
  CatalogItemCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  @AutoMap()
  id: string;

  @AutoMap()
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @AutoMap(() => Product)
  @BelongsTo(() => Product, 'product_id')
  product?: Product;

  @AutoMap(() => Set)
  @BelongsTo(() => Set, 'set_id')
  kit?: Set;
}
