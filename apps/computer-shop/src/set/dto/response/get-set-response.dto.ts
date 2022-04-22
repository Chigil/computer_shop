import { ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { GetProductResponseDto } from '../../../product/dto/response/get-product-response.dto';

export class GetSetResponseDto {
  @ApiPropertyOptional({ description: 'UUID set' })
  @AutoMap()
  public readonly id?: string;

  @ApiPropertyOptional({ description: 'Name set' })
  @AutoMap()
  public readonly name?: string;

  @ApiPropertyOptional({ description: 'Description set' })
  @AutoMap()
  public readonly description?: string;

  @ApiPropertyOptional({ description: 'Price' })
  @AutoMap()
  public readonly price?: number;

  @ApiPropertyOptional({ description: 'Amount' })
  @AutoMap()
  public readonly amount?: number;

  @AutoMap(() => GetProductResponseDto)
  public readonly products?: GetProductResponseDto[];
}
