import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {RoleService} from "../role/role.service";


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RoleService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll( {include: {all: true}});
        return users;
    }

    async getOneUser(id: number) {
        const user = await this.userRepository.findByPk(id)
        return user
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await this.userRepository.findByPk(id);
        await user.update(dto);
        await user.save();
        return user;
    }

    async deleteUser(id: number) {
        await this.userRepository.destroy({where: {id: id}});
        return {message: `user witch id = ${id} deleted`};
    }
}