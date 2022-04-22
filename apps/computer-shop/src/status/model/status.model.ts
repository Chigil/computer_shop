import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AutoMap } from '@automapper/classes';


interface StatusCreationAttributes {
  name: string;
}

@Table({ tableName: 'status', underscored: true })
export class Status extends Model<Status, StatusCreationAttributes> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  @AutoMap()
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true, defaultValue: "Added. In processing."  })
  @AutoMap()
  name: string;
}