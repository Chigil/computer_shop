import { IsEmail, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleDto } from '../../role/dto/user-role.dto';

export class JwtTokenDto {
  @IsEmail({}, { message: 'Incorrect email address' })
  email: string;

  @ValidateNested({ message: 'Must be a Role class' })
  @Type(() => UserRoleDto)
  role: UserRoleDto;

  @IsUUID('all', { message: 'Must be UUID' })
  id: string;
}
