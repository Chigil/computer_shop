import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductRequestDto {

  @ApiProperty({ example: 'Клавиатура Logitech MX Keys', description: 'Название' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 'стандартная для ПК/для компьютеров Apple/для iPad/для устройств Android/для планшетов Windows, мембранная, пластик, интерфейс подключения - радио/Bluetooth, подсветка, цвет черный',
    description: 'Описание',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: 155.45, description: 'Цена' })
  @IsNumber({}, { message: 'Должно быть строкой' })
  readonly price: number;

  @ApiProperty({ example: 5, description: 'Количество в наличии' })
  @IsNumber({}, { message: 'Должно быть строкой' })
  readonly amount: number;


  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'Идентификатор каталога товара',
  })
  @IsUUID('all', { message: 'Должно быть UUID' })
  readonly catalogItemId: string;
}
