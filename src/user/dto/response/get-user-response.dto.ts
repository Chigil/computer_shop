import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Role } from '../../../role/model/role.model';
import { LoyaltyProgram } from '../../../loyalty-program/model/loyalty-program.model';

export class GetUserResponseDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Индентификатор пользователя',
  })
  @AutoMap()
  id: string;

  @ApiProperty({
      example: 'coolemail@gmail.com',
      description: 'Почтовый адрес',
    })
  @AutoMap()
  email: string;

  @ApiProperty({
      example: 'Андрюша Валерьевич',
      description: 'ФИО пользователя',
    })
  @AutoMap()
  username: string;

  @ApiProperty({
      example: '01091f63-3860-4c65-a13b-1c6529194410',
      description: 'Идентификатор роли пользователя',
    })
  @AutoMap(() => Role)
  roleId: string;

  @ApiProperty({
      example: '01091f63-3860-4c65-a13b-1c6529194410',
      description: 'Идентификатор программы лояальности пользователя',
    })
  @AutoMap( () => LoyaltyProgram)
  loyaltyProgramId: string;
}
