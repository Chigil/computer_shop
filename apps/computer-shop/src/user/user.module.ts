import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { RoleModule } from '../role/role.module';
import { UserProfile } from './user.profile';
import { Role } from '../role/model/role.model';

@Module({
  controllers: [UserController],
  providers: [UserService, UserProfile],
  imports: [SequelizeModule.forFeature([User, Role]), RoleModule],
  exports: [UserService],
})
export class UserModule {}
