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
import { Role } from '../../../../libs/common/src/decorators/roles-auth.decorators';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';

@ApiTags('User')
@Controller('user')
@Role('ADMIN')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: CreateUserResponseDto })
  @Post()
  @UseInterceptors(MapInterceptor(User, CreateUserResponseDto))
  private create(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [GetUserResponseDto] })
  @Post('all')
  @UseInterceptors(MapInterceptor(User, GetUserResponseDto, { isArray: true }))
  private getAll(@Body() getUserResponseDto: GetUserResponseDto) {
    return this.userService.getAll(getUserResponseDto);
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: GetUserResponseDto })
  @Get(':id')
  @UseInterceptors(MapInterceptor(User, GetUserResponseDto))
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 201, type: UpdateUserRequestDto })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
