import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validateOrReject } from 'class-validator';
import { UserService } from '../../user/user.service';
import { JwtTokenDto } from '../dto/jwt-token.dto';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY || 'SECRET',
    });
  }

  logger = new Logger(PassportStrategy.name);

  async validate(payload: any) {
    const validateUser = plainToClass(JwtTokenDto, payload);
    validateOrReject(validateUser).catch((errors) => {
      this.logger.log(`errors: ${JSON.stringify(errors)}`);
    });
    const user = await this.userService.getUserByEmail(payload.email);
    if (user) {
      return user;
    }
    return { email: payload.email, id: payload.id, role: payload.role };
  }
}
