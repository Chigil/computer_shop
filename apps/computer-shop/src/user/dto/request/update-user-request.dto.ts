import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    example: 'coolemail@gmail.com',
    description: 'Email address',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Incorrect email' })
  public readonly email?: string;

  @IsOptional()
  @ApiProperty({ example: '12345', description: 'Password', required: false })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Length must be at least 4 and no more than 16' })
  public readonly password?: string;
}
