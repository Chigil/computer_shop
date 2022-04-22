import { ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class GetProductResponseDto {
  @ApiPropertyOptional({ description: 'UUID product' })
  @AutoMap()
  public readonly id?: string;

  @ApiPropertyOptional({ description: 'Name product' })
  @AutoMap()
  public readonly name?: string;

  @ApiPropertyOptional({ description: 'Description product' })
  @AutoMap()
  public readonly description?: string;

  @ApiPropertyOptional({ description: 'Price' })
  @AutoMap()
  public readonly price?: number;

  @ApiPropertyOptional({ description: 'Amount' })
  @AutoMap()
  public readonly amount?: number;
}
