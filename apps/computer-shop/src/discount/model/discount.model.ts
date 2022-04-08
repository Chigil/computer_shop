import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { DataTypes } from 'sequelize';
import { DiscountType } from '../../discount-type/model/discount-type.model';

interface DiscountCreationAttributes {
  discountId: string;
}

@Table({ tableName: 'discount', underscored: true })
export class Discount extends Model<Discount, DiscountCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @BelongsTo(() => DiscountType, 'discountTypeId')
  discountType: string;

  @Column({ type: DataType.FLOAT, allowNull: false, unique: true })
  amount: number;
}
