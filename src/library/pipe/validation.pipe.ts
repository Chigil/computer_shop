import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { ValidationException } from '../exeption/validation.exception';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    if (typeof obj === 'object') {
      const errors = await validate(obj);
      if (errors.length) {
        const messages = errors.map((err) => {
          return `${err.property} - ${Object.values(err.constraints).join(
            ', ',
          )}`;
        });
        throw new ValidationException(messages);
      }
    }
    return value;
  }
}
