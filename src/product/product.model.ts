import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

interface ProductCreationAttributes {
  name: string;
  description: string;
  price: number;
  amount: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreationAttributes> {

  @Column({ type: DataType.UUID, unique: true, defaultValue: DataTypes.UUIDV4, primaryKey: true })
  id: string;

  @ApiProperty({ example: 'Ноутбук HP 255 G8 34P23ES', description: 'Название товара' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;


  @ApiProperty({
    example: '15.6" 1920 x 1080 IPS, 60 Гц, несенсорный, AMD Athlon Silver 3050U 2300 МГц, 8 ГБ DDR4, SSD 256 ГБ, видеокарта встроенная, без ОС, цвет крышки серебристый',
    description: 'Описание товара',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 1599.50, description: 'Цена товара' })
  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  price: number;

  @ApiProperty({ example: 15, description: 'Количество товара' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  amount: number;

  @ApiProperty({ example: '4', description: 'Идентификатор каталога' })
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  catalog_id: number;

  // @BelongsToMany(() => Set, () => ProductSet)
  // sets: Set;
}