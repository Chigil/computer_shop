import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './model/role.model';
import { CreateRoleRequestDto } from './dto/request/create-role-request.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  public async create(dto: CreateRoleRequestDto) {
    const role = await this.roleRepository.create(dto);
    if (role) {
      return { id: role.id };
    }
  }

  public async getByValue(ident: string) {
    return await this.roleRepository.findOne({ where: { ident } });
  }

  public async getAll() {
    return await this.roleRepository.findAll();
  }
}
