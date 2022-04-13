import { HttpException, HttpStatus } from '@nestjs/common';

export class NotUniqueValueException extends HttpException {
  constructor(value: string) {
    super(
      { message: `${value} - is already in use or is not unique` },
      HttpStatus.BAD_REQUEST,
    );
  }
}