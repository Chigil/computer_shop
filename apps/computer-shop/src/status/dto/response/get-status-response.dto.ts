import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { GetAllDto } from '../../../../../../libs/common/src/dto/get-all.dto';

export class GetStatusResponseDto extends GetAllDto{
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'UUID user' })
  @AutoMap()
  public readonly id: string;

  @ApiProperty({ example: 'Pending', description: 'Status name' })
  @AutoMap()
  public readonly name: string;
}
