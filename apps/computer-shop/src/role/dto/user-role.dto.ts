import { IsString, IsUUID } from 'class-validator';

export class UserRoleDto {
  @IsUUID('all', { message: 'Должно быть UUID' })
  id: string;

  @IsString({ message: 'Должно быть String' })
  ident: string;
}
