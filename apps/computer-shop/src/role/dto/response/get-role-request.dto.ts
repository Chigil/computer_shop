import { AutoMap } from '@automapper/classes';

export class GetRoleRequestDto {
  @AutoMap()
  public readonly ident: string;
}