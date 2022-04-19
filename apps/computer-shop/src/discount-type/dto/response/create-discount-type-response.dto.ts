import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateDiscountTypeResponseDto {
  @ApiProperty({
    example: '37c258c1-da15-4f1f-ad80-fcba15c9b9f3',
    description: 'Discount type UUID',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  @AutoMap()
  public readonly id: string;
}
