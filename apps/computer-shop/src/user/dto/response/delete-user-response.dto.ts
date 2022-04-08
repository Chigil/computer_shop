import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponseDto {
  @ApiProperty({
    example: 'true',
    description: 'Ответ об успешной или неуспешной операции',
  })
  success: boolean;
}
