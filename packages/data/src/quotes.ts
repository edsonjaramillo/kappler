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
  purchaserEmail: "edsonajaramillo@gmail.com",
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
      price: 1088.02,
      quantity: 2,
    },
    {
      product: "F5H582SILGXL91",
      description: "Frontline 500 NFPA 1990",
      price: 3357.96,
      quantity: 4,
    },

    {
      product: "D2H440HYSMMD9212",
      description: "DuraChem 200 NFPA 1990",
      price: 1284.07,
      quantity: 8,
    },
  ],
};

export const quotes: Quote[] = [exampleQuote];
