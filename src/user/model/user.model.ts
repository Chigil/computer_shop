import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Role } from '../../role/model/role.model';
import { LoyaltyProgram } from '../../loyalty-program/model/loyalty-program.model';
import { AutoMap } from '@automapper/classes';

interface UserCreationAttributes {
  email: string;
  password: string;
  role_id: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  @AutoMap()
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @AutoMap()
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @AutoMap()
  username: string;

  @BelongsTo(() => LoyaltyProgram, 'loyalty_program_id')
  @AutoMap(() => LoyaltyProgram)
  loyaltyProgram: string;

  @BelongsTo(() => Role, 'role_id')
  @AutoMap(() => Role)
  role: Role;
}
