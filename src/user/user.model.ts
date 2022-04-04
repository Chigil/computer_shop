import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Role } from '../role/role.model';
import { LoyaltyProgram } from '../loyalty-program/loyalty-program.model';

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

  @Column({ type: DataType.STRING, allowNull: true })
  username: string;

  @BelongsTo( () => LoyaltyProgram, 'loyalty_id')
  loyaltyProgram: string;

  @BelongsTo( () => Role, 'role_id')
  role: Role;
}