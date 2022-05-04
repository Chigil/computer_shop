import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class CreateCatalogItemResponseDto {
  @AutoMap()
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID catalog item',
  })
  public readonly id: string;
}
