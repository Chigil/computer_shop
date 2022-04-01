import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttributes {
  email: string;
  password: string;
  role_id: number;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'coolemail@gmail.com', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 2, description: 'Идентификатор роли пользователя' })
  //@ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 2 })
  role_id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО пользователя' })
  @Column({ type: DataType.STRING, allowNull: true })
  username: string;

  @ApiProperty({ example: 1, description: 'Индентификатор программы лояльности ' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  loyalty_program_id: number;
}