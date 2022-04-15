import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSetRequestDto {
  @ApiProperty({
    example: 'Компьютер Jet Gamer 5i10400FD16SD24X105TL2W5',
    description: 'Название',
  })
  @IsString({ message: 'Должно быть строкой' })
  public readonly name: string;

  @ApiProperty({
    example:
      'игровой (геймерский), CPU Intel Core i5 10400F 2900 МГц, RAM DDR4 16 ГБ, SSD 240 ГБ, графика: NVIDIA GeForce GTX 1050 Ti 4 ГБ, БП 500 Вт, без ОС',
    description: 'Описание',
  })
  @IsString({ message: 'Должно быть строкой' })
  public readonly description: string;

  @ApiProperty({ example: 2555.55, description: 'Цена' })
  @IsNumber({}, { message: 'Должно быть строкой' })
  readonly price: number;

  @ApiProperty({ example: 5, description: 'Количество в наличии' })
  @IsNumber({}, { message: 'Должно быть строкой' })
  public readonly amount: number;
}
