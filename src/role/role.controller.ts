import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.model';

@ApiTags('Роль')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @ApiOperation({summary:'Создание роли'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({summary:'Получение всех ролей'})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAll() {
    return this.roleService.getAllRoles();
  }
}
