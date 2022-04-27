import { NestFactory } from '@nestjs/core';
import { PdfSaverModule } from './pdf-saver.module';

async function pdfSaver() {
  const PORT = process.env.PDF_SAVER_PORT || 3000;
  const app = await NestFactory.create(PdfSaverModule);
  await app.listen(PORT, () => console.log(`SERVER RUN ON PORT = ${PORT}`));
}
pdfSaver();
