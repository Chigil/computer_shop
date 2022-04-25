import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { GetProductResponseDto } from '../../../product/dto/response/get-product-response.dto';
import { GetSetResponseDto } from '../../../set/dto/response/get-set-response.dto';

export class GetCatalogItemResponseDto {
  @ApiProperty({
    example: 'PC for game',
    description: 'Catalog title',
  })
  @AutoMap()
  public readonly title: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Item',
  })
  @AutoMap()
  public readonly id: string;

  @AutoMap(() => GetProductResponseDto)
  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Product in order',
  })
  public readonly product?: GetProductResponseDto;

  @AutoMap(() => GetSetResponseDto)
  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Set in order',
  })
  public readonly kit?: GetSetResponseDto;
}
