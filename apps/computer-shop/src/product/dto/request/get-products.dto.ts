import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from '@nestjs/class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { GetAllDto } from '../../../../../../libs/common/src/dto/get-all.dto';

export class GetProductsDto extends GetAllDto {
  @ApiPropertyOptional({ description: 'Name product' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ description: 'Description product' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({ description: 'Price' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly price?: number;

  @ApiPropertyOptional({ description: 'Amount' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly amount?: number;

  @ApiPropertyOptional({ description: 'Catalog Item id', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  readonly catalogItemId?: string;
}
