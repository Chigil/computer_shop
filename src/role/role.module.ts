import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {RoleController} from "./role.controller";
import {RoleService} from "./role.service";
import {Role} from "./role.model";

@Module({
    providers: [RoleService],
    controllers: [RoleController],
    imports: [
        SequelizeModule.forFeature([Role])
    ],
    exports: [
        RoleService
    ]
})
export class RoleModule {
}
