import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

interface LoyaltyProgramCreationAttributes {
  discount_id: string;
}

@Table({ tableName: 'loyalty_program' })
export class LoyaltyProgram extends Model<LoyaltyProgram, LoyaltyProgramCreationAttributes> {
  @Column({ type: DataType.UUID, unique: true, defaultValue: DataTypes.UUIDV4, primaryKey: true })
  id: string;

  //@ForeignKey(() => Discount)
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'Уникальный идентификатор скидки' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  discount_id: string;

}