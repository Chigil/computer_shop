import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Set } from './set.model';
import { CreateSetRequestDto } from './dto/request/create-set-request.dto';
import { SetService } from './set.service';

@ApiTags('Комплект')
@Controller('set')
export class SetController {
  constructor(private setService: SetService) {
  }

  @ApiOperation({ summary: 'Создание комплекта' })
  @ApiResponse({ status: 200, type: Set })
  @Post()
  create(@Body() createSetDto: CreateSetRequestDto) {
    return this.setService.createSet(createSetDto);
  }

  @ApiOperation({ summary: 'Получение всех комплектов' })
  @ApiResponse({ status: 200, type: [Set] })
  @Get()
  getAll() {
    return this.setService.getAllSets();
  }

  @ApiOperation({ summary: 'Получение одного комплекта по айди' })
  @ApiResponse({ status: 200, type: Set })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.setService.getOneSet(id);
  }

  @ApiOperation({ summary: 'Обновление комплекта' })
  @ApiResponse({ status: 200, type: Set })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: CreateSetRequestDto) {
    return this.setService.updateSet(id, updateSetDto);
  }

  @ApiOperation({ summary: 'Удаление комплекта' })
  @ApiResponse({ status: 200, type: '{message: \'Удалено\'}' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.setService.deleteSet(id);
  }
}
