import { GetAllDto } from '../../../../../../libs/common/src/dto/get-all.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetOrderDto extends GetAllDto {

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID User order',
  })
  public readonly userId?: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Discount order',
  })
  public readonly discountId?: string;

  @ApiPropertyOptional({ description: 'Total price order' })
  @IsOptional()
  @IsNumber()
  public readonly totalPrice?: number;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Status order',
  })
  public readonly statusId?: string;
}