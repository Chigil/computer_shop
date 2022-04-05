import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {DataTypes} from "sequelize";

interface DiscountTypeCreationAttributes   {
    type: string;
}

@ApiTags('Тип скидки')
@Table({tableName: 'discount_type'})
export class DiscountType extends Model<DiscountType, DiscountTypeCreationAttributes> {
    @Column({type: DataType.UUID, unique: true, defaultValue: DataTypes.UUIDV4, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Скидка постоянного покупателя', description: 'Тип скидки'})
    @Column({type: DataType.STRING, allowNull: false, unique:true})
    type: string;

}