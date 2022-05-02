export class PdfDataContract {
  number: string;
  price: number;
  items: Items[];
  userEmail: string;
  userId: string;
  exchange: string;
  routingKey: string;
}

export class PdfDataContractRequest {
  id: string;
  totalPrice: number;
  items: Items[];
  exchange: string;
  routingKey: string;
  user: User;
}

class User {
  email: string;
  id: string;
}

class Items {
  title: string;
  id: string;
}
export class PdfResponseContract {
  id: string;
  file: File;
}

class File {
  filename: string;
}
