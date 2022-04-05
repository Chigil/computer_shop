import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { RoleService } from '../role/role.service';
import { NotFoundException } from '../library/exeption/not-found.exception';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RoleService) {
  }

  async create(dto: CreateUserRequestDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    if (user) {
      return user;
    }
  }

  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getOne(id: string) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      return new NotFoundException('user', id);
    }
    return user;
  }

  async update(id: string, dto: UpdateUserRequestDto) {
    const user = await this.userRepository.findByPk(id);
    await user.update(dto);
    await user.save();
    return user;
  }

  async delete(id: string) {
    const deleted = await this.userRepository.destroy({ where: { id: id } });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
