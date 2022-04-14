import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserRequestDto } from '../user/dto/request/create-user-request.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/model/user.model';
import * as bcrypt from 'bcryptjs';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { NotUniqueValueException } from '../../../../libs/common/src/exeption/not-unique-value.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(userDto: CreateUserRequestDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  public async registration(userDto: CreateUserRequestDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new NotUniqueValueException(userDto.email);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  public async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async validateUser(userDto: CreateUserRequestDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new NotFoundException('user', userDto.email);
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Not correct email or password!',
    });
  }
}
