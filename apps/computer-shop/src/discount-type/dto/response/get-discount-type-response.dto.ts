import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class GetDiscountTypeResponseDto {
  @ApiProperty({
    example: '92f33fc1-d840-4022-84ee-005baf6fd7a7',
    description: 'UUID discount-type',
  })
  @AutoMap()
  id: string;

  @ApiProperty({
    example: 'Regular customer discount',
    description: 'Discount type',
  })
  @AutoMap()
  @IsString({ message: 'Must be a string' })
  public readonly type: string;
}
