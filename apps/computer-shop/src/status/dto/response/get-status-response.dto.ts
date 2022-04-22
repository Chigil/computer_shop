import { AutoMap } from '@automapper/classes';

export class GetStatusResponseDto {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;
}