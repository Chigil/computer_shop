import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '../../../../libs/common/src/exeption/not-found.exception';
import { CreateLoyaltyProgramRequestDto } from './dto/request/create-loyalty-program-request.dto';
import { LoyaltyProgram } from './model/loyalty-program.model';
import { DiscountService } from '../discount/discount.service';

@Injectable()
export class LoyaltyProgramService {
  constructor(
    @InjectModel(LoyaltyProgram)
    private loyaltyProgramRepository: typeof LoyaltyProgram,
    private discountRepository: DiscountService,
  ) {}

  public async create(dto: CreateLoyaltyProgramRequestDto) {
    const discount = await this.discountRepository.getOne(dto.discountId);
    const program = await this.loyaltyProgramRepository.create(discount);
    if (!program || !discount) {
      throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
    }
    await program.$set('discount', dto.discountId);
    return program;
  }

  public async getAll() {
    const programs = await this.loyaltyProgramRepository.findAll({
      include: [{ all: true, nested: true }],
    });
    return programs;
  }

  public async getOne(id: string) {
    const program = await this.loyaltyProgramRepository.findByPk(id, {
      include: { all: true },
    });
    if (!program) {
      throw new NotFoundException('loyalty program', id);
    }
    return program;
  }

  public async update(id: string, dto: CreateLoyaltyProgramRequestDto) {
    const program = await this.loyaltyProgramRepository.findByPk(id);
    const discount = await this.discountRepository.getOne(dto.discountId);
    if (!program || !discount) {
      throw new HttpException('Not created', HttpStatus.BAD_REQUEST);
    }
    await program.$set('discount', dto.discountId);
    return program;
  }

  public async delete(id: string) {
    const deleted = await this.loyaltyProgramRepository.destroy({
      where: { id: id },
    });
    if (deleted != 0) {
      return { success: true };
    }
    return { success: false };
  }
}
