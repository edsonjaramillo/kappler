export type Quote = {
  id: string;
  creator: string;
  purchaserName: string;
  purchaserEmail: string;
  customerId: string;
  companyName: string;
  validityDate: string;
  shipToAddress: ShipToAddress;
  lineItems: LineItems[];
};

type LineItems = {
  product: string;
  description: string;
  price: number;
  quantity: number;
};

type ShipToAddress = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export const exampleQuote: Quote = {
  id: "SQN0003001",
  creator: "EAJ",
  purchaserName: "Edson",
  purchaserEmail: "ej@gmail.com",
  validityDate: "9/20/26",
  customerId: "2032",
  companyName: "Safety Inc",
  shipToAddress: {
    addressLine1: "123 Main Street",
    addressLine2: "Suite 400",
    city: "Houston",
    state: "TX",
    postalCode: "77002",
    country: "United States",
  },
  lineItems: [
    {
      product: "99402YW",
      description: "Chemical Tape",
      price: 1000,
      quantity: 1,
    },
    {
      product: "Z5H400",
      description: "Hazmat Suit",
      price: 2000,
      quantity: 4,
    },

    {
      product: "Z3H240",
      description: "Hazmat Suit (Level B)",
      price: 1500,
      quantity: 8,
    },
  ],
};

export const quotes: Quote[] = [exampleQuote];
