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
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UserService } from './user.service';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './model/user.model';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { GetUserResponseDto } from './dto/response/get-user-response.dto';
import { DeleteUserResponseDto } from './dto/response/delete-user-response.dto';

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: CreateUserResponseDto })
  @Post()
  @UseInterceptors(MapInterceptor(User, CreateUserResponseDto))
  private create(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [GetUserResponseDto] })
  @Get()
  @UseInterceptors(MapInterceptor(User, GetUserResponseDto, { isArray: true }))
  private getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Получение одного пользователя по айди' })
  @ApiResponse({ status: 200, type: GetUserResponseDto })
  @Get(':id')
  @UseInterceptors(MapInterceptor(User, GetUserResponseDto))
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 201, type: CreateUserResponseDto })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: DeleteUserResponseDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
