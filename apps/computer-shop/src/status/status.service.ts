import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './model/status.model';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status)
    private statusRepository: typeof Status,
  ) {}

  public async create(dto) {
    const status = await this.statusRepository.create(dto);
    if (status) {
      return status;
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }

  public async getAll() {
    const statuses = await this.statusRepository.findAll({
      include: { all: true },
    });
    return statuses;
  }

  public async getOne(id: string) {
    const status = await this.statusRepository.findByPk(id, {
      include: { all: true },
    });
    if (!status) {
      throw new NotFoundException('status', id);
    }
    return status;
  }

  public async update(id: string, dto) {
    const status = await this.statusRepository.findByPk(id);
    await status.update(dto);
    await status.save();
    return status;
  }

  public async delete(id: string) {
    const deleted = await this.statusRepository.destroy({
      where: { id: id },
    });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
