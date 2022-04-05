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
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UserService } from './user.service';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './model/user.model';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';
import { GetAllUserResponse } from './dto/response/get-all-user-response';

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: CreateUserResponseDto })
  @Post()
  private create(@Body() createUserDto: CreateUserRequestDto): Promise<object> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [GetAllUserResponse] })
  @Get()
  private getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Получение одного пользователя по айди' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: '{ success: true }' })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
