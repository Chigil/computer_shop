import {Body, Controller, Get, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Роль')
@Controller('role')
export class RoleController {
    constructor(private  roleService: RoleService) {
    }
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }

    @Get()
    getAll() {
        return this.roleService.getAllRoles();
    }
}
