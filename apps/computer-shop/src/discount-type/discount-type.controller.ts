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
import { MapInterceptor } from '@automapper/nestjs';
import { DiscountType } from './model/discount-type.model';
import { DiscountTypeService } from './discount-type.service';
import { UpdateDiscountTypeRequestDto } from './dto/request/update-discount-type-request.dto';
import { GetDiscountTypeResponseDto } from './dto/response/get-discount-type-response.dto';
import { CreateDiscountTypeRequestDto } from './dto/request/create-discount-type-request.dto';
import { SuccessOperationDto } from '../../../../libs/common/src/dto/success-operation.dto';
import { CreateDiscountTypeResponseDto } from './dto/response/create-discount-type-response.dto';

@ApiTags('Discount Type')
@Controller('discount-type')
export class DiscountTypeController {
  constructor(private discountTypeService: DiscountTypeService) {}

  @ApiOperation({ summary: 'Create discount type' })
  @ApiResponse({ status: 201, type: CreateDiscountTypeResponseDto })
  @Post()
  @UseInterceptors(MapInterceptor(DiscountType, CreateDiscountTypeResponseDto))
  private create(
    @Body() createDiscountTypeRequestDto: CreateDiscountTypeRequestDto,
  ): Promise<CreateDiscountTypeResponseDto> {
    return this.discountTypeService.create(createDiscountTypeRequestDto);
  }

  @ApiOperation({ summary: 'Get all discount types' })
  @ApiResponse({ status: 200, type: [GetDiscountTypeResponseDto] })
  @Get()
  @UseInterceptors(
    MapInterceptor(DiscountType, GetDiscountTypeResponseDto, { isArray: true }),
  )
  private getAll() {
    return this.discountTypeService.getAll();
  }

  @ApiOperation({ summary: 'Get one discount type by id' })
  @ApiResponse({ status: 200, type: GetDiscountTypeResponseDto })
  @Get(':id')
  @UseInterceptors(MapInterceptor(DiscountType, GetDiscountTypeResponseDto))
  private getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.discountTypeService.getOne(id);
  }

  @ApiOperation({ summary: 'Update discount type' })
  @ApiResponse({ status: 201, type: UpdateDiscountTypeRequestDto })
  @Patch(':id')
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDiscountTypeDto: UpdateDiscountTypeRequestDto,
  ): Promise<DiscountType> {
    return this.discountTypeService.update(id, updateDiscountTypeDto);
  }

  @ApiOperation({ summary: 'Delete discount type' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @Delete(':id')
  private delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.discountTypeService.delete(id);
  }
}
