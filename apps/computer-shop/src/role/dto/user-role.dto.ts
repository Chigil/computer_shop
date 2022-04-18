import { IsString, IsUUID } from 'class-validator';

export class UserRoleDto {
  @IsUUID('all', { message: 'Must be UUID' })
  id: string;

  @IsString({ message: 'Must be String' })
  ident: string;
}
