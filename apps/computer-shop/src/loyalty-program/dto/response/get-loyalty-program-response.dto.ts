import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { GetDiscountResponseDto } from '../../../discount/dto/response/get-discount-response.dto';

export class GetLoyaltyProgramResponseDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID loyalty program',
  })
  @AutoMap()
  public readonly id: string;

  @ApiProperty({
    example: '',
    description: 'Discount',
  })
  @AutoMap(() => GetDiscountResponseDto)
  public readonly discount: GetDiscountResponseDto;
}
