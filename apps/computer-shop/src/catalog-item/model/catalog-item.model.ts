import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

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
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;
}
