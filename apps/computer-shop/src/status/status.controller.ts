import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { StatusService } from './status.service';
import { Status } from './model/status.model';
import { CreateStatusRequestDto } from './dto/request/create-status-request.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { GetStatusResponseDto } from './dto/response/get-status-response.dto';
import { CreateStatusResponseDto } from './dto/response/create-status-response.dto';
import { Role } from '../../../../libs/common/src/decorators/roles-auth.decorators';

@Controller('status')
@ApiTags('Status')
@Role('ADMIN')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @ApiOperation({ summary: 'Create status' })
  @UseInterceptors(MapInterceptor(Status, CreateStatusResponseDto))
  @ApiResponse({ status: 201, type: CreateStatusResponseDto })
  @Post()
  private create(@Body() createStatusDto: CreateStatusRequestDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Get all status' })
  @UseInterceptors(
    MapInterceptor(Status, GetStatusResponseDto, { isArray: true }),
  )
  @ApiResponse({ status: 200, type: [GetStatusResponseDto] })
  @Post('all')
  private getAll(@Body() getStatusResponseDto: GetStatusResponseDto) {
    return this.statusService.getAll(getStatusResponseDto);
  }

  @ApiOperation({ summary: 'Get one order by id' })
  @UseInterceptors(MapInterceptor(Status, GetStatusResponseDto))
  @ApiResponse({ status: 200, type: GetStatusResponseDto })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.statusService.getOne(id);
  }

  @ApiOperation({ summary: 'Update order' })
  @UseInterceptors(MapInterceptor(Status, CreateStatusResponseDto))
  @ApiResponse({ status: 200, type: CreateStatusResponseDto })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: CreateStatusRequestDto,
  ) {
    return this.statusService.update(id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.statusService.delete(id);
  }
}
