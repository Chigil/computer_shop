import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { Discount } from './model/discount.model';
import { CreateDiscountRequestDto } from './dto/request/create-discount-request.dto';
import { CreateDiscountResponseDto } from './dto/response/create-discount-response.dto';
import { UpdateDiscountRequestDto } from './dto/request/update-discount-request.dto';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { GetDiscountResponseDto } from './dto/response/get-discount-response.dto';

@ApiTags('Discount')
@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @ApiOperation({ summary: 'Create discount' })
  @ApiResponse({ status: 201, type: CreateDiscountResponseDto })
  @Post()
  private create(
    @Body() createDiscountDto: CreateDiscountRequestDto,
  ): Promise<CreateDiscountResponseDto> {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Get all discounts' })
  @ApiResponse({ status: 200, type: [GetDiscountResponseDto] })
  @UseInterceptors(
    MapInterceptor(Discount, GetDiscountResponseDto, { isArray: true }),
  )
  @Get()
  private getAll() {
    return this.discountService.getAll();
  }

  @ApiOperation({ summary: 'Get one discount by id' })
  @ApiResponse({ status: 200, type: GetDiscountResponseDto })
  @Get(':id')
  @UseInterceptors(MapInterceptor(Discount, GetDiscountResponseDto))
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.discountService.getOne(id);
  }

  @ApiOperation({ summary: 'Update discount' })
  @ApiResponse({ status: 200, type: UpdateDiscountRequestDto })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDiscountDto: UpdateDiscountRequestDto,
  ) {
    return this.discountService.update(id, updateDiscountDto);
  }

  @ApiOperation({ summary: 'Delete discount' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.discountService.delete(id);
  }
}
