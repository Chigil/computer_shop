import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty({
    example: 'Клавиатура Logitech MX Keys',
    description: 'Name',
  })
  @IsString({ message: 'Must be a string' })
  public readonly name: string;

  @ApiProperty({
    example:
      'стандартная для ПК/для компьютеров Apple/для iPad/для устройств Android/для планшетов Windows, мембранная, пластик, интерфейс подключения - радио/Bluetooth, подсветка, цвет черный',
    description: 'Description',
  })
  @IsString({ message: 'Must be a string' })
  public readonly description: string;

  @ApiProperty({ example: 155.45, description: 'Price' })
  @IsNumber({}, { message: 'Must be a number' })
  public readonly price: number;

  @ApiProperty({ example: 5, description: 'Quantity in stock' })
  @IsNumber({}, { message: 'Must be a number' })
  public readonly amount: number;

  @ApiProperty({ example: ['', ''], description: 'Products arrays' })
  @IsArray({ message: 'Must be a array' })
  public readonly products: string[];
}
