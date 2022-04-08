import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    example: 'coolemail@gmail.com',
    description: 'Почтовый адрес',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  public readonly email?: string;

  @IsOptional()
  @ApiProperty({ example: '12345', description: 'Пароль', required: false })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Должно не меньше 4 и не больше 16' })
  public readonly password?: string;
}
