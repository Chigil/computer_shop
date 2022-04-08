import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface DiscountTypeCreationAttributes {
  type: string;
}

@Table({ tableName: 'discount_type' })
export class DiscountType extends Model<
  DiscountType,
  DiscountTypeCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  type: string;
}
