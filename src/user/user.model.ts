import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

interface UserCreationAttributes {
  email: string;
  password: string;
  role_id: number;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({ type: DataType.UUID, unique: true, defaultValue: DataTypes.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  //@ForeignKey(() => Role)
  @Column({ type: DataType.UUID, allowNull: false, defaultValue: "a128073f-1692-475f-a4b2-04599983d496"})
  role_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  username: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  loyalty_program_id: number;
}