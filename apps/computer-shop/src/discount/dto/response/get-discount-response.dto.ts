import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { GetDiscountTypeResponseDto } from '../../../discount-type/dto/response/get-discount-type-response.dto';
import { Column, DataType } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export class GetDiscountResponseDto {
  @ApiProperty({
    example: '291f9832-f194-4654-8463-5eb009786cb8',
    description: 'UUID discount',
  })
  @AutoMap()
  id: string;

  @ApiProperty({
    example: '12.5',
    description: 'Discount amount',
  })
  @IsString({ message: 'Must be a number' })
  @AutoMap()
  public readonly amount: number;

  @ApiProperty({
    example: GetDiscountResponseDto,
    description: 'Discount Type',
  })
  @AutoMap(() => GetDiscountTypeResponseDto)
  public readonly discountType: GetDiscountTypeResponseDto;
}
