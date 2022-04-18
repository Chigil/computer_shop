import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'coolemail@gmail.com',
    description: 'Email address',
  })
  @IsEmail({}, { message: 'Incorrect email' })
  public readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Length must be at least 4 and no more than 16' })
  public readonly password: string;
}
