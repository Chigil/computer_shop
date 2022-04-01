import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RoleCreationAttributes {
  ident: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  ident: string;

}