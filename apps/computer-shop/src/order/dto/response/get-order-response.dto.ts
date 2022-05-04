import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { GetUserResponseDto } from '../../../user/dto/response/get-user-response.dto';
import { GetDiscountResponseDto } from '../../../discount/dto/response/get-discount-response.dto';
import { GetCatalogItemResponseDto } from '../../../catalog-item/dto/response/get-catalog-item-response.dto';
import { GetStatusResponseDto } from '../../../status/dto/response/get-status-response.dto';
import { IsOptional } from 'class-validator';

export class GetOrderResponseDto {
  @AutoMap()
  public id: string;

  @AutoMap()
  public totalPrice: number;

  @ApiProperty({
    description: 'User',
  })
  @AutoMap(() => GetUserResponseDto)
  public readonly user: GetUserResponseDto;

  @ApiProperty({
    description: 'Discount',
  })
  @IsOptional()
  @AutoMap(() => GetDiscountResponseDto)
  public readonly discount?: GetDiscountResponseDto;

  @ApiProperty({
    description: 'CatalogItem',
  })
  @AutoMap(() => GetCatalogItemResponseDto)
  public readonly items: GetCatalogItemResponseDto[];

  @ApiProperty({
    description: 'Status',
  })
  @AutoMap(() => GetStatusResponseDto)
  public readonly status: GetStatusResponseDto;
}
