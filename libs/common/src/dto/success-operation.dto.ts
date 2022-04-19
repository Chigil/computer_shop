import { ApiProperty } from '@nestjs/swagger';

export class SuccessOperationDto {
  @ApiProperty({
    example: 'true',
    description: 'Successful operation response',
  })
  success: boolean;
}
