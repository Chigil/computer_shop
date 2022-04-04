import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(name: string, id?: string) {
    super( {message: `${name} ${id ? `with id: ${id}`: '-'} not found`}, HttpStatus.NOT_FOUND);
  }
}