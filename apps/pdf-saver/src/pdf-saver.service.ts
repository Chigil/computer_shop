import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfSaverService {
  getHello(): string {
    return 'Hello World!';
  }
}
