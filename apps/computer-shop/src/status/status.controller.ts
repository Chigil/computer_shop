import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { StatusService } from './status.service';
import { Status } from './model/status.model';
import { CreateStatusRequestDto } from './dto/request/create-status-request.dto';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @ApiOperation({ summary: 'Create status' })
  @ApiResponse({ status: 201, type: Status })
  @Post()
  private create(@Body() createStatusDto: CreateStatusRequestDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Get all order' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get()
  private getAll() {
    return this.statusService.getAll();
  }

  @ApiOperation({ summary: 'Get one order by id' })
  @ApiResponse({ status: 200, type: Status })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.statusService.getOne(id);
  }

  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, type: Status })
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
