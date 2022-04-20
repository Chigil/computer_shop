import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateLoyaltyProgramRequestDto {
  @ApiProperty({
    example: '01091f63-3860-4c65-a13b-1c6529194410',
    description: 'UUID discount',
  })
  @IsUUID('all', { message: 'Must be UUID' })
  public readonly discountId: string;
}
