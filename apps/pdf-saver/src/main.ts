import { NestFactory } from '@nestjs/core';
import { PdfSaverModule } from './pdf-saver.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function pdfSaver() {
  const PORT = process.env.PDF_SAVER_PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(PdfSaverModule);
  app.useStaticAssets(join(__dirname, './', 'public'));
  app.setBaseViewsDir(
    join(__dirname, '../../../apps/computer-shop/src', 'order'),
  );
  app.setViewEngine('hbs');
  await app.listen(PORT, () => console.log(`SERVER RUN ON PORT = ${PORT}`));
}
pdfSaver();
