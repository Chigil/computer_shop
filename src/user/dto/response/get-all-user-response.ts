import { ApiProperty } from '@nestjs/swagger';

export class GetAllUserResponse {
  @ApiProperty({ example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", description: 'Индентификатор пользователя' })
  id: string;

  @ApiProperty({ example: 'coolemail@gmail.com', description: 'Почтовый адрес' })
  readonly email: string;

  @ApiProperty({ example: 'Андрюша Валерьевич', description: 'ФИО пользователя' })
  readonly username: string;

  @ApiProperty({ example: '01091f63-3860-4c65-a13b-1c6529194410', description: 'Идентификатор роли пользователя' })
  readonly role_id: string;

  @ApiProperty({ example: '01091f63-3860-4c65-a13b-1c6529194410', description: 'Идентификатор программы лояальности пользователя' })
  readonly loyalty_program_id: string;
}