import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSetRequestDto {
  @ApiProperty({
    example: 'Компьютер Jet Gamer 5i10400FD16SD24X105TL2W5',
    description: 'Name',
  })
  @IsString({ message: 'Must be a string' })
  public readonly name: string;

  @ApiProperty({
    example:
      'игровой (геймерский), CPU Intel Core i5 10400F 2900 МГц, RAM DDR4 16 ГБ, SSD 240 ГБ, графика: NVIDIA GeForce GTX 1050 Ti 4 ГБ, БП 500 Вт, без ОС',
    description: 'Description',
  })
  @IsString({ message: 'Must be a string' })
  public readonly description: string;

  @ApiProperty({ example: 2555.55, description: 'Price' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly price: number;

  @ApiProperty({ example: 5, description: 'Quantity in stock' })
  @IsNumber({}, { message: 'Must be a number' })
  public readonly amount: number;
}
