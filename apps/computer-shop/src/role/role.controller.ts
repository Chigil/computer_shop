import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleRequestDto } from './dto/request/create-role-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './model/role.model';

@ApiTags('Роль')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  private create(@Body() createRoleDto: CreateRoleRequestDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Получение всех ролей' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  private getAll() {
    return this.roleService.getAll();
  }

  @ApiOperation({ summary: 'Получение роли по значению' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getByValue(value);
  }
}
