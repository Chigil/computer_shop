import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusRequestDto {
  @ApiProperty({ example: 'Pending', description: 'Status name' })
  @IsString({ message: 'Must be a string' })
  public readonly name: string;
}