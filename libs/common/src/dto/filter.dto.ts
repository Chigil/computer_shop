import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum FilterType {
  I_LIKE = '[Op.iLike]',
  IN = '[Op.in]',
}

export class FilterDto {
  @ApiPropertyOptional({ description: 'Filter field' })
  @IsOptional()
  @IsString()
  public readonly field?: string;

  @ApiPropertyOptional({ description: 'Filter option' })
  @IsOptional()
  @IsEnum(FilterType)
  public readonly option?: FilterType;

  @ApiPropertyOptional({ description: 'Filter value' })
  @IsOptional()
  @IsString()
  public readonly value?: string[] | string;
}
