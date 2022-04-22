import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { GetUserResponseDto } from '../../../user/dto/response/get-user-response.dto';
import { User } from '../../../user/model/user.model';
import { Discount } from '../../../discount/model/discount.model';
import { GetDiscountResponseDto } from '../../../discount/dto/response/get-discount-response.dto';
import { GetCatalogItemResponseDto } from '../../../catalog-item/dto/response/get-catalog-item-response.dto';
import { CatalogItem } from '../../../catalog-item/model/catalog-item.model';
import { Status } from '../../../status/model/status.model';
import { GetStatusResponseDto } from '../../../status/dto/response/get-status-response.dto';

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
  @AutoMap(() => GetDiscountResponseDto)
  public readonly discount: GetDiscountResponseDto;

  @ApiProperty({
    description: 'CatalogItem',
  })
  @AutoMap(() => GetCatalogItemResponseDto)
  public readonly items: GetCatalogItemResponseDto[];

  @ApiProperty({
    description: 'Status',
  })
  @AutoMap( () => GetStatusResponseDto)
  public readonly status: GetStatusResponseDto;
}