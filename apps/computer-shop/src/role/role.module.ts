import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './model/role.model';
import { RoleProfile } from './role.profile';
import { User } from '../user/model/user.model';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleProfile],
  imports: [SequelizeModule.forFeature([Role, User])],
  exports: [RoleService],
})
export class RoleModule {}
