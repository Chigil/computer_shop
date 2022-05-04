import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { IsString, IsUUID } from 'class-validator';

export class CreateCatalogItemRequestDto {
  @ApiProperty({
    example: 'PC for game',
    description: 'Catalog title',
  })
  @AutoMap()
  @IsString({ message: 'Must be a string' })
  public readonly title?: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Product',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly productId?: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID Set',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly setId?: string;
}
