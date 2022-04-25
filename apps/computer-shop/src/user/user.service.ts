import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { RoleService } from '../role/role.service';
import { search } from '../../../../libs/common/src/utility/search';
import { paginate } from '../../../../libs/common/src/utility/paginate';
import { sort } from '../../../../libs/common/src/utility/sort';
import { GetUserRequestDto } from './dto/request/get-user-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  public async create(dto: CreateUserRequestDto) {
    const user = await this.userRepository.create(dto);
    if (user) {
      const role = await this.roleService.getByValue('CLIENT');
      await user.$set('role', role.id);
      user.role = [role];
      return user;
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }

  public async getAll(body: GetUserRequestDto) {
    const users = await this.userRepository.findAll({
      include: { all: true },
      where: search(body.filter),
      ...paginate(body.pagination),
      ...sort(body.sorting),
    });
    return users;
  }

  public async getOne(id: string) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      throw new NotFoundException('user', id);
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

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
