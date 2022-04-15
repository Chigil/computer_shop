import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum Sort {
  DESCENDING = 'DESC',
  ASCENDING = 'ASC',
}

export class SortingDto {
  @ApiPropertyOptional({ description: 'Sorting order' })
  @IsOptional()
  @IsEnum(Sort)
  public readonly sortingOrder?: Sort;

  @ApiPropertyOptional({ description: 'Sorting field' })
  @IsOptional()
  @IsString()
  public readonly field?: string;
}
