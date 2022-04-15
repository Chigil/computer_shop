import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from '@nestjs/class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Page' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  public readonly page?: number = 0;

  @ApiPropertyOptional({ description: 'Page size' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  public readonly size?: number = 10;
}
