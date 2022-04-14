import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Sort {
  DESCENDING = 'DESC',
  ASCENDING = 'ASC',
}

export class SortingDto {
  @IsOptional()
  @IsEnum(Sort)
  readonly sortingOrder?: Sort;

  @IsOptional()
  @IsString()
  readonly field?: string;
}
