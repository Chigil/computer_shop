import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../../../../libs/common/src/decorators/roles-auth.decorators';
import { LoyaltyProgramService } from './loyalty-program.service';
import { GetLoyaltyProgramResponseDto } from './dto/response/get-loyalty-program-response.dto';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { CreateLoyaltyProgramRequestDto } from './dto/request/create-loyalty-program-request.dto';
import { LoyaltyProgram } from './model/loyalty-program.model';

@ApiTags('Loyalty Program')
@Controller('loyalty-program')
@Role('ADMIN')
export class LoyaltyProgramController {
  constructor(private loyaltyProgramService: LoyaltyProgramService) {}

  @ApiOperation({ summary: 'Create program' })
  @ApiResponse({ status: 201, type: CreateLoyaltyProgramRequestDto })
  @Post()
  private create(
    @Body() createLoyaltyProgramDto: CreateLoyaltyProgramRequestDto,
  ) {
    return this.loyaltyProgramService.create(createLoyaltyProgramDto);
  }

  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({ status: 200, type: [GetLoyaltyProgramResponseDto] })
  @Get()
  private getAll() {
    return this.loyaltyProgramService.getAll();
  }

  @ApiOperation({ summary: 'Get one program by id' })
  @ApiResponse({ status: 200, type: GetLoyaltyProgramResponseDto })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.loyaltyProgramService.getOne(id);
  }

  @ApiOperation({ summary: 'Update program' })
  @ApiResponse({ status: 201, type: CreateLoyaltyProgramRequestDto })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLoyaltyProgramDto: CreateLoyaltyProgramRequestDto,
  ): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.update(id, updateLoyaltyProgramDto);
  }

  @ApiOperation({ summary: 'Delete program' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.loyaltyProgramService.delete(id);
  }
}
