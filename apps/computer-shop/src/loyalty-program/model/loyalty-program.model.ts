import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Discount } from '../../discount/model/discount.model';

interface LoyaltyProgramCreationAttributes {
  discountId: string;
}

@Table({ tableName: 'loyalty_program', underscored: true })
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
  id: string;

  @BelongsTo(() => Discount, 'discountId')
  discount: string;
}
