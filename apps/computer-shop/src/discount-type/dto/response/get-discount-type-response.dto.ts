import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class GetDiscountTypeResponseDto {
  @ApiProperty({
    example: 'Regular customer discount',
    description: 'Discount type',
  })
  @AutoMap()
  @IsString({ message: 'Must be a string' })
  public readonly type: string;
}
