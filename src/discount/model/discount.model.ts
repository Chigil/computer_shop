import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import { DiscountType } from '../../discount-type/model/discount-type.model';

interface DiscountCreationAttributes {
  discountId: string;
}

@ApiTags('Скидка')
@Table({ tableName: 'discount' })
export class Discount extends Model<Discount, DiscountCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Уникальный идентификатор типа скидки',
  })
  @BelongsTo(() => DiscountType, 'discount_type_id')
  discountType: string;

  @ApiProperty({ example: 50.45, description: 'Сумма скидки' })
  @Column({ type: DataType.FLOAT, allowNull: false, unique: true })
  amount: number;
}
