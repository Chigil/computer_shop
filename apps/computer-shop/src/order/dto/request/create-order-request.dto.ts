import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { CatalogItem } from '../../../catalog-item/model/catalog-item.model';

export class CreateOrderRequestDto {
  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID User',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly userId: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Discount',
  })
  @IsOptional()
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly discountId?: string;

  @ApiProperty({ example: CatalogItem })
  @IsOptional()
  @IsArray({ message: 'Must be a array' })
  public readonly items?: string[];
}
