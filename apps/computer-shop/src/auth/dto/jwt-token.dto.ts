import { IsEmail, IsObject, IsUUID, Length } from 'class-validator';
import { Role } from '../../role/model/role.model';

export class JwtTokenDto {

  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  role: Role;

  @IsUUID('all', { message: 'Должно быть UUID' })
  id: string;
}