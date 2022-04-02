import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

interface SetCreationAttributes {
  name: string;
  description: string;
  price: number;
  amount: number;
}

@Table({ tableName: 'set' })
export class Set extends Model<Set, SetCreationAttributes> {

  @Column({ type: DataType.UUID, unique: true, defaultValue: DataTypes.UUIDV4, primaryKey: true })
  id: string;

  @ApiProperty({ example: 'Компьютер Jet Gamer 5i10400FD16SD24X105TL2W5', description: 'Название комлекта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'игровой (геймерский), CPU Intel Core i5 10400F 2900 МГц, RAM DDR4 16 ГБ, SSD 240 ГБ, графика: NVIDIA GeForce GTX 1050 Ti 4 ГБ, БП 500 Вт, без ОС',
    description: 'Описание комлекта',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 1599.50, description: 'Цена комлекта' })
  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  price: number;

  @ApiProperty({ example: 15, description: 'Количество комлектов' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  amount: number;

  @ApiProperty({ example: '4', description: 'Идентификатор каталога' })
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  catalog_id: number;

  // @BelongsToMany(() => Product, () => ProductSet)
  // products: Product[];
}