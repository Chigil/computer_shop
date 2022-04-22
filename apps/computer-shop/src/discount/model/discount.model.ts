import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { DataTypes } from 'sequelize';
import { DiscountType } from '../../discount-type/model/discount-type.model';
import { AutoMap } from '@automapper/classes';

interface DiscountCreationAttributes {
  discountId: string;
}

@Table({ tableName: 'discount', underscored: true, createdAt: false, updatedAt: false  })
export class Discount extends Model<Discount, DiscountCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  @AutoMap()
  id: string;

  @BelongsTo(() => DiscountType, 'discountTypeId')
  @AutoMap(() => DiscountType)
  discountType: DiscountType;

  @Column({ type: DataType.FLOAT, allowNull: false, unique: true })
  @AutoMap()
  amount: number;
}
