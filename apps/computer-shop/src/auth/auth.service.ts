import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserRequestDto } from '../user/dto/request/create-user-request.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/model/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService) {
  }

  public async login(userDto: CreateUserRequestDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)

  }

  public async registration(userDto: CreateUserRequestDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User witch this email busy', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({ ...userDto, password: hashPassword });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: CreateUserRequestDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Not correct email or password!'})
  }
}
