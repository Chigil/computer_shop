export class PdfDataContract {
  orderId: string;
  price: number;
  items: Items[];
  userEmail: string;
  userId: string;
  exchange?: string;
  routingKey?: string;
}

class Items {
  title: string;
  id: string;
}

export class PdfResponseContract {
  id?: string;
  filename: string;
}

export type FileResponse = {
  filename: string;
};
