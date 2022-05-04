import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString } from 'class-validator';
import { GetAllDto } from '../../../../../../libs/common/src/dto/get-all.dto';

export class GetCatalogItemRequestDto extends GetAllDto {
  @ApiProperty({
    example: 'PC for game',
    description: 'Catalog title',
  })
  @AutoMap()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  public readonly title?: string;
}
