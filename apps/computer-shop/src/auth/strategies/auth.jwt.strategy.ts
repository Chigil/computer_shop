import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validateOrReject } from 'class-validator';
import { UserService } from '../../user/user.service';
import { JwtTokenDto } from '../dto/jwt-token.dto';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY,
    });
  }

  async validate(payload: JwtTokenDto){
    const validateUser = new JwtTokenDto()
    validateUser.id = payload.id
    validateUser.role = payload.role
    validateUser.email = payload.email
    validateOrReject(validateUser).catch((errors) => {
      console.log(errors)
    });
    const user = await this.userService.getUserByEmail(payload.email);
    if (user) {
      return user;
    }
    return { email: payload.email, id: payload.id, role: payload.role };
  }
}
