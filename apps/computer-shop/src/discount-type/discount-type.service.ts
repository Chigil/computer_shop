import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { DiscountType } from './model/discount-type.model';
import { UpdateDiscountTypeRequestDto } from './dto/request/update-discount-type-request.dto';
import { CreateDiscountTypeRequestDto } from './dto/request/create-discount-type-request.dto';

@Injectable()
export class DiscountTypeService {
  constructor(
    @InjectModel(DiscountType)
    private discountTypeRepository: typeof DiscountType,
  ) {}

  public async create(dto: CreateDiscountTypeRequestDto) {
    const discountType = await this.discountTypeRepository.create(dto);
    if (discountType) {
      return discountType;
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }

  public async getAll() {
    const discountTypes = await this.discountTypeRepository.findAll();
    return discountTypes;
  }

  public async getOne(id: string) {
    const discountType = await this.discountTypeRepository.findByPk(id, {
      include: { all: true },
    });
    if (!discountType) {
      throw new NotFoundException('discount type', id);
    }
    return discountType;
  }

  public async update(id: string, dto: UpdateDiscountTypeRequestDto) {
    const discountType = await this.discountTypeRepository.findByPk(id);
    await discountType.update(dto);
    await discountType.save();
    return discountType;
  }

  public async delete(id: string) {
    const deleted = await this.discountTypeRepository.destroy({
      where: { id: id },
    });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
