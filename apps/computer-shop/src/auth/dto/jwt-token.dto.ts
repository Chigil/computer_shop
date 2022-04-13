import { IsEmail, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleDto } from '../../role/dto/user-role.dto';

export class JwtTokenDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ValidateNested({ message: 'Дожно быть классом Role' })
  @Type(() => UserRoleDto)
  role: UserRoleDto;

  @IsUUID('all', { message: 'Должно быть UUID' })
  id: string;
}
