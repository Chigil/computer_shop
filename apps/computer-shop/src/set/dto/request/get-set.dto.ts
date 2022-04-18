import { GetAllDto } from '../../../../../../libs/common/src/dto/get-all.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from '@nestjs/class-transformer';

export class GetSetDto extends GetAllDto {
  @ApiPropertyOptional({ description: 'Name product' })
  @IsOptional()
  @IsString()
  public readonly name?: string;

  @ApiPropertyOptional({ description: 'Description product' })
  @IsOptional()
  @IsString()
  public readonly description?: string;

  @ApiPropertyOptional({ description: 'Price' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  public readonly price?: number;

  @ApiPropertyOptional({ description: 'Amount' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  public readonly amount?: number;
}
