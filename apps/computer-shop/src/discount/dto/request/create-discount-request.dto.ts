import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateDiscountRequestDto {
  @ApiProperty({
    example: '37c258c1-da15-4f1f-ad80-fcba15c9b9f3',
    description: 'Discount type UUID',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  @AutoMap()
  public readonly discountTypeId: string;

  @ApiProperty({
    example: '12.5',
    description: 'Discount amount',
  })
  @IsString({ message: 'Must be a number' })
  @AutoMap()
  public readonly amount: number;
}
