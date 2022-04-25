import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './model/discount.model';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { UpdateDiscountRequestDto } from './dto/request/update-discount-request.dto';
import { CreateDiscountRequestDto } from './dto/request/create-discount-request.dto';
import { CreateDiscountResponseDto } from './dto/response/create-discount-response.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private discountRepository: typeof Discount,
  ) {}

  public async create(
    dto: CreateDiscountRequestDto,
  ): Promise<CreateDiscountResponseDto> {
    const discount = await this.discountRepository.create(dto);
    if (dto.amount > 100)
      throw new HttpException(
        'Discount must not exceed 99% ',
        HttpStatus.BAD_REQUEST,
      );
    if (discount) {
      return discount;
    }
    throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
  }

  public async getAll() {
    const discounts = await this.discountRepository.findAll({
      include: { all: true },
    });
    return discounts;
  }

  public async getOne(id: string) {
    const discount = await this.discountRepository.findByPk(id);
    if (!discount) {
      throw new NotFoundException('discount', id);
    }
    return discount;
  }

  public async update(id: string, dto: UpdateDiscountRequestDto) {
    const discount = await this.discountRepository.findByPk(id);
    await discount.update(dto);
    await discount.save();
    return discount;
  }

  public async delete(id: string) {
    const deleted = await this.discountRepository.destroy({
      where: { id: id },
    });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
