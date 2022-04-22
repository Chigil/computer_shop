import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class CreateOrderRequestDto {
  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID User',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly userId: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Status',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly statusId?: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Discount',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly discountId?: string;

  @ApiProperty({ example: ['productId'] })
  @IsArray({ message: 'Must be a array' })
  public readonly products?: string[];

  @ApiProperty({ example: ['productId'] })
  @IsArray({ message: 'Must be a array' })
  public readonly sets?: string[];
}
