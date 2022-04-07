import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import { Discount } from '../../discount/model/discount.model';

interface LoyaltyProgramCreationAttributes {
  discountId: string;
}

@Table({ tableName: 'loyalty_program' })
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

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Уникальный идентификатор скидки',
  })
  @BelongsTo(() => Discount, 'discountId')
  discount: string;
}
