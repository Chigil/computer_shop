import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";


@Module({
  controllers: [],
  providers: [],
  imports: [
      SequelizeModule.forFeature([User]),
  ]
})
export class UserModule {}
