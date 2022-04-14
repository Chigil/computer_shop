import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../../../../../libs/common/src/decorators/roles-auth.decorators';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  private isRequiredRole: boolean;

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.isRequiredRole = this.reflector.getAllAndOverride<boolean>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!this.isRequiredRole) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (this?.isRequiredRole !== user.role.ident) {
      throw new HttpException('Not access', HttpStatus.FORBIDDEN);
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
