import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
    constructor(private  userService: UserService) {
    }

    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @ApiOperation({summary:'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary:'Получение одного пользователя по айди'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.userService.getOneUser(+id);
    }

    @ApiOperation({summary:'Обновление пользователя'})
    @ApiResponse({status: 200, type: User})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(+id, updateUserDto)
    }

    @ApiOperation({summary:'Удаление пользователя'})
    @ApiResponse({status: 200, type: "{message: 'Удалено'}"})
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }
}
