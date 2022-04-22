import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Role } from '../../../role/model/role.model';
import { LoyaltyProgram } from '../../../loyalty-program/model/loyalty-program.model';
import { GetAllDto } from '../../../../../../libs/common/src/dto/get-all.dto';

export class GetUserResponseDto extends GetAllDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID user',
  })
  @AutoMap()
  public readonly id: string;

  @ApiProperty({
    example: 'coolemail@gmail.com',
    description: 'User email',
  })
  @AutoMap()
  public readonly email: string;

  @ApiProperty({
    example: 'John Wick',
    description: 'Username user',
  })
  @AutoMap()
  public readonly username: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID User role',
  })
  @AutoMap(() => Role)
  public readonly roleId: string;

  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID loyaltyProgram',
  })
  @AutoMap(() => LoyaltyProgram)
  public readonly loyaltyProgramId: string;
}
