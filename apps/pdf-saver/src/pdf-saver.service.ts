import { Injectable } from '@nestjs/common';
import { PdfDataContract } from '../../../libs/common/src/contract/pdf-data-contract';
import fs = require('fs');
import Handlebars = require('handlebars');
import pdf = require('html-pdf');

@Injectable()
export class PdfSaverService {
  public async generateOrderPdf(msg: PdfDataContract): Promise<object> {
    const html = PdfSaverService.render(process.env.PDF_SAVER_FILE_PATH, msg);
    const fileName = `${process.env.PDF_SAVER_FILE_NAME}order_${msg.number}`;
    return await new Promise<object>((resolve, reject) => {
      pdf
        .create(html)
        .toFile(`./${fileName}.pdf`, (err: object, res: object) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }

  private static render(filename: string, data: PdfDataContract) {
    const source = fs.readFileSync(filename, 'utf8').toString();
    const template = Handlebars.compile(source);
    return template(data);
  }
}
