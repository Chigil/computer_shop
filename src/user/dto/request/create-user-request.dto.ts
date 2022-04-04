import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString, Length} from "class-validator";

export class CreateUserRequestDto {

    @ApiProperty({example: "coolemail@gmail.com", description: 'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: "12345", description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Должно не меньше 4 и не больше 16'})
    readonly password: string;

    @ApiProperty({example: 2, description: 'Идентификатор роли пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly role_id: number;
}