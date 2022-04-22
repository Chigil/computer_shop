import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AutoMap } from '@automapper/classes';

interface DiscountTypeCreationAttributes {
  type: string;
}

@Table({ tableName: 'discount_type', underscored: true, createdAt: false, updatedAt: false  })
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
  @AutoMap()
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  @AutoMap()
  type: string;
}
