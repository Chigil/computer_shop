import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AutoMap } from '@automapper/classes';

interface RoleCreationAttributes {
  ident: string;
}

@Table({ tableName: 'role', underscored: true })
export class Role extends Model<Role, RoleCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AutoMap()
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  ident: string;
}
