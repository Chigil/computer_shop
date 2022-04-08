import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from '../user/dto/request/create-user-request.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/login')
  private login(@Body() userDto: CreateUserRequestDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  private registration(@Body() userDto: CreateUserRequestDto) {
    return this.authService.registration(userDto);
  }
}
