import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from '@nestjs/class-transformer';
import { PaginationDto } from './pagination.dto';
import { SortingDto } from './sorting.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from './filter.dto';

export abstract class GetAllDto {
  @ApiPropertyOptional({ description: 'Pagination' })
  @IsOptional()
  @Type(() => PaginationDto)
  @ValidateNested()
  readonly pagination?: PaginationDto = new PaginationDto();

  @ApiPropertyOptional({ description: 'Sorting' })
  @IsOptional()
  @Type(() => SortingDto)
  @ValidateNested({ each: true })
  readonly sorting?: SortingDto[] = [];

  @ApiPropertyOptional({ description: 'Filter' })
  @IsOptional()
  @Type(() => FilterDto)
  @ValidateNested()
  readonly filter?: FilterDto;
}
