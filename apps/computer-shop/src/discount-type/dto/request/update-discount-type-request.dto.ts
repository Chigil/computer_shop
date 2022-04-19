import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateDiscountTypeRequestDto {
  @ApiProperty({
    example: 'Regular customer discount',
    description: 'Discount type',
  })
  @IsString({ message: 'Must be a string' })
  @AutoMap()
  public readonly type: string;
}
