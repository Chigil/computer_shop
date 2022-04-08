import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { RoleModule } from '../role/role.module';
import { UserProfile } from './user.profile';
import { Role } from '../role/model/role.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserProfile],
  imports: [SequelizeModule.forFeature([User, Role]), RoleModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {
}
