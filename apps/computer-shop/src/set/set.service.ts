import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Set } from './model/set.model';
import { CreateSetRequestDto } from './dto/request/create-set-request.dto';
import { search } from '../../../../libs/common/src/utility/search';
import { paginate } from '../../../../libs/common/src/utility/paginate';
import { sort } from '../../../../libs/common/src/utility/sort';
import { GetSetDto } from './dto/request/get-set.dto';

@Injectable()
export class SetService {
  constructor(@InjectModel(Set) private setRepository: typeof Set) {}

  public async create(dto: CreateSetRequestDto) {
    const set = await this.setRepository.create(dto);
    if (set) {
      return { id: set.id };
    }
    throw new HttpException('Not crated', HttpStatus.BAD_REQUEST);
  }

  public async getAll(body: GetSetDto) {
    const sets = await this.setRepository.findAll({
      include: { all: true },
      where: search(body.filter),
      ...paginate(body.pagination),
      ...sort(body.sorting),
    });
    return sets;
  }

  public async getOne(id: string) {
    const set = await this.setRepository.findByPk(id);
    return set;
  }

  public async update(id: string, dto: CreateSetRequestDto) {
    const set = await this.setRepository.findByPk(id);
    await set.update(dto);
    await set.save();
    return set;
  }

  public async delete(id: string) {
    const deleted = await this.setRepository.destroy({ where: { id: id } });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
