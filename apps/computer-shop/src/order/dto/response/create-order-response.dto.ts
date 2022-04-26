import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderResponseDto {
  @ApiProperty({
    example: '07330094-33c0-433a-8357-ebf9dccbc482',
    description: 'UUID order',
  })
  @AutoMap()
  public readonly id: string;
}