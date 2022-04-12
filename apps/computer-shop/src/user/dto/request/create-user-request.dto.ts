import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'coolemail@gmail.com',
    description: 'Почтовый адрес',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Должно не меньше 4 и не больше 16' })
  readonly password: string;

  // @ApiProperty({
  //   example: '01091f63-3860-4c65-a13b-1c6529194410',
  //   description: 'Идентификатор роли пользователя',
  // })
  // @IsUUID('all', { message: 'Должно быть UUID' })
  // readonly roleId: string;
}
