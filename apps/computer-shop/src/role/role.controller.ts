import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleRequestDto } from './dto/request/create-role-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './model/role.model';
import { MapInterceptor } from '@automapper/nestjs';
import { LoyaltyProgram } from '../loyalty-program/model/loyalty-program.model';
import { GetLoyaltyProgramResponseDto } from '../loyalty-program/dto/response/get-loyalty-program-response.dto';
import { GetRoleRequestDto } from './dto/response/get-role-request.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  private create(@Body() createRoleDto: CreateRoleRequestDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @UseInterceptors(MapInterceptor(Role, GetRoleRequestDto))
  @Get()
  private getAll() {
    return this.roleService.getAll();
  }

  @ApiOperation({ summary: 'Get one role by id' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getByValue(value);
  }
}
