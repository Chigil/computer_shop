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
import { Set } from './model/set.model';
import { CreateSetRequestDto } from './dto/request/create-set-request.dto';
import { SetService } from './set.service';
import { GetSetDto } from './dto/request/get-set.dto';

@ApiTags('Set')
@Controller('set')
export class SetController {
  constructor(private setService: SetService) {}

  @ApiOperation({ summary: 'Create set' })
  @ApiResponse({ status: 201, type: Set })
  @Post()
  private create(@Body() createSetDto: CreateSetRequestDto) {
    return this.setService.create(createSetDto);
  }

  @ApiOperation({ summary: 'Get all sets' })
  @ApiResponse({ status: 200, type: [Set] })
  @Post('all')
  private getAll(@Body() getSetDto: GetSetDto) {
    return this.setService.getAll(getSetDto);
  }

  @ApiOperation({ summary: 'Get one set on id' })
  @ApiResponse({ status: 200, type: Set })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.setService.getOne(id);
  }

  @ApiOperation({ summary: 'Update set' })
  @ApiResponse({ status: 200, type: Set })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSetDto: CreateSetRequestDto,
  ) {
    return this.setService.update(id, updateSetDto);
  }

  @ApiOperation({ summary: 'Delete set' })
  @ApiResponse({ status: 200, type: '{ success: true }' })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.setService.delete(id);
  }
}
