import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'coolemail@gmail.com',
    description: 'Почтовый адрес',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  public readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Должно не меньше 4 и не больше 16' })
  public readonly password: string;
}
