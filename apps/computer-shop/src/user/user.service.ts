import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  public async create(
    dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.userRepository.create(dto);
    if (user) {
      return user;
    }
  }

  public async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  public async getOne(id: string) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      return new NotFoundException('user', id);
    }
    return user;
  }

  public async update(id: string, dto: UpdateUserRequestDto) {
    const user = await this.userRepository.findByPk(id);
    await user.update(dto);
    await user.save();
    return user;
  }

  public async delete(id: string) {
    const deleted = await this.userRepository.destroy({ where: { id: id } });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}