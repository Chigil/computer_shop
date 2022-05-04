import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from '../user/dto/request/create-user-request.dto';
import { AuthService } from './auth.service';
import { Public } from '../../../../libs/common/src/decorators/public.decorators';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  private login(@Body() userDto: CreateUserRequestDto) {
    return this.authService.login(userDto);
  }

  @Public()
  @Post('/registration')
  private registration(@Body() userDto: CreateUserRequestDto) {
    return this.authService.registration(userDto);
  }
}
