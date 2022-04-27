import { Controller, Get } from '@nestjs/common';
import { PdfSaverService } from './pdf-saver.service';

@Controller()
export class PdfSaverController {
  constructor(private readonly pdfSaverService: PdfSaverService) {}

  @Get()
  getHello(): string {
    return this.pdfSaverService.getHello();
  }
}
