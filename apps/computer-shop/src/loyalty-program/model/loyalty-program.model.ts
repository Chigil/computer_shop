import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Discount } from '../../discount/model/discount.model';
import { AutoMap } from '@automapper/classes';

interface LoyaltyProgramCreationAttributes {
  discountId: string;
}

@Table({ tableName: 'loyalty_program', underscored: true, createdAt: false, updatedAt: false  })
export class LoyaltyProgram extends Model<
  LoyaltyProgram,
  LoyaltyProgramCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  @AutoMap()
  id: string;

  @AutoMap(() => Discount)
  @BelongsTo(() => Discount, 'discountId')
  discount: Discount;
}
