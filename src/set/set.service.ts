import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Set } from './set.model';
import { CreateSetDto } from './dto/create-set.dto';

@Injectable()
export class SetService {
  constructor(@InjectModel(Set) private setRepository: typeof Set) {
  }

  async createSet(dto: CreateSetDto) {
    const set = await this.setRepository.create(dto);
    return set;
  }

  async getAllSets() {
    const sets = await this.setRepository.findAll({ include: { all: true } });
    return sets;
  }

  async getOneSet(id: string) {
    const set = await this.setRepository.findByPk(id);
    return set;
  }

  async updateSet(id: string, dto: CreateSetDto) {
    const set = await this.setRepository.findByPk(id);
    await set.update(dto);
    await set.save();
    return set;
  }

  async deleteSet(id: string) {
    await this.setRepository.destroy({ where: { id: id } });
    return { message: `Set witch id = ${id} deleted` };
  }
}
