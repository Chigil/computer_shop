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
import { Role } from '../../../../libs/common/src/decorators/roles-auth.decorators';

@ApiTags('Комплект')
@Controller('set')
export class SetController {
  constructor(private setService: SetService) {}

  @ApiOperation({ summary: 'Создание комплекта' })
  @ApiResponse({ status: 201, type: Set })
  @Role('ADMIN')
  @Post()
  private create(@Body() createSetDto: CreateSetRequestDto) {
    return this.setService.create(createSetDto);
  }

  @ApiOperation({ summary: 'Получение всех комплектов' })
  @ApiResponse({ status: 200, type: [Set] })
  @Get()
  private getAll() {
    return this.setService.getAll();
  }

  @ApiOperation({ summary: 'Получение одного комплекта по айди' })
  @ApiResponse({ status: 200, type: Set })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.setService.getOne(id);
  }

  @ApiOperation({ summary: 'Обновление комплекта' })
  @ApiResponse({ status: 200, type: Set })
  @Role('ADMIN')
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSetDto: CreateSetRequestDto,
  ) {
    return this.setService.update(id, updateSetDto);
  }

  @ApiOperation({ summary: 'Удаление комплекта' })
  @ApiResponse({ status: 200, type: '{ success: true }' })
  @Role('ADMIN')
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.setService.delete(id);
  }
}
