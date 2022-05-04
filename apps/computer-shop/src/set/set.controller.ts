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
import { Set } from './model/set.model';
import { CreateSetRequestDto } from './dto/request/create-set-request.dto';
import { SetService } from './set.service';
import { GetSetDto } from './dto/request/get-set.dto';
import { Role } from '../../../../libs/common/src/decorators/roles-auth.decorators';
import { MapInterceptor } from '@automapper/nestjs';
import { GetSetResponseDto } from './dto/response/get-set-response.dto';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';

@ApiTags('Set')
@Controller('set')
export class SetController {
  constructor(private setService: SetService) {}

  @ApiOperation({ summary: 'Create set' })
  @ApiResponse({ status: 201, type: Set })
  @Role('ADMIN')
  @UseInterceptors(MapInterceptor(Set, CreateSetRequestDto))
  @Post()
  private create(@Body() createSetDto: CreateSetRequestDto) {
    return this.setService.create(createSetDto);
  }

  @ApiOperation({ summary: 'Get all sets' })
  @ApiResponse({ status: 200, type: [GetSetResponseDto] })
  @UseInterceptors(MapInterceptor(Set, GetSetResponseDto, { isArray: true }))
  @Post('all')
  private getAll(@Body() getSetDto: GetSetDto) {
    return this.setService.getAll(getSetDto);
  }

  @ApiOperation({ summary: 'Get one set by id' })
  @ApiResponse({ status: 200, type: GetSetResponseDto })
  @UseInterceptors(MapInterceptor(Set, GetSetResponseDto))
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.setService.getOne(id);
  }

  @ApiOperation({ summary: 'Update set' })
  @ApiResponse({ status: 200, type: GetSetResponseDto })
  @UseInterceptors(MapInterceptor(Set, CreateSetRequestDto))
  @Role('ADMIN')
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSetDto: CreateSetRequestDto,
  ) {
    return this.setService.update(id, updateSetDto);
  }

  @ApiOperation({ summary: 'Delete set' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Role('ADMIN')
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.setService.delete(id);
  }
}
