import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum FilterType {
  I_LIKE = '[Op.iLike]',
  IN = '[Op.in]',
}

export class FilterDto {
  @IsOptional()
  readonly field?: string;

  @IsOptional()
  @IsEnum(FilterType)
  readonly option?: FilterType;

  @IsOptional()
  @IsString()
  readonly value?: string[] | string;
}
