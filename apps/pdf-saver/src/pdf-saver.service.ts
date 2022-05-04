import { Injectable } from '@nestjs/common';
import {
  FileResponse,
  PdfDataContract,
} from '../../../libs/common/src/contract/pdf-data-contract';
import fs = require('fs');
import Handlebars = require('handlebars');
import pdf = require('html-pdf');

@Injectable()
export class PdfSaverService {
  public async generateOrderPdf(msg: PdfDataContract): Promise<FileResponse> {
    const html = PdfSaverService.render(process.env.PDF_SAVER_FILE_PATH, msg);
    const fileName = `${process.env.PDF_SAVER_FILE_NAME}order_${msg.orderId}`;
    return await new Promise<FileResponse>((resolve, reject) => {
      pdf
        .create(html)
        .toFile(`./${fileName}.pdf`, (err: object, res: FileResponse) => {
          if (err) {
            reject(err);
          }
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
