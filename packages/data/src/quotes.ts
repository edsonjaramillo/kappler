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

const otherQuotes: Quote[] = [
  {
    id: "SQN0003002",
    creator: "EAJ",
    purchaserName: "Brittany",
    purchaserEmail: "bharvey@kappler.com",
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
        product: "PVS412WHSMMD",
        description: "ProVent Coverall",
        price: 305.18,
        quantity: 2,
      },
      {
        product: "PVS414WHLGXL",
        description: "ProVent Coverall",
        price: 435.48,
        quantity: 1,
      },
      {
        product: "PVS417WH2X3X",
        description: "ProVent Coverall",
        price: 367.58,
        quantity: 4,
      },
    ],
  },
  {
    id: "SQN0003003",
    creator: "EAJ",
    purchaserName: "Laura",
    purchaserEmail: "lkappler@kappler.com",
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
        product: "PVS428WHSMMD",
        description: "ProVent Coverall",
        price: 412.72,
        quantity: 3,
      },
      {
        product: "PPH424BLLGXL",
        description: "ProVent Plus Coverall",
        price: 340.69,
        quantity: 2,
      },
      {
        product: "PPH425BL2X3X",
        description: "ProVent Plus Coverall",
        price: 322.75,
        quantity: 1,
      },
    ],
  },
  {
    id: "SQN0003004",
    creator: "EAJ",
    purchaserName: "Tim",
    purchaserEmail: "tdoss@kappler.com",
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
        product: "PPH428BLSMMD",
        description: "ProVent Plus Coverall",
        price: 226.05,
        quantity: 5,
      },
      {
        product: "PPH433BLLGXL",
        description: "ProVent Plus Coverall",
        price: 273.43,
        quantity: 2,
      },
      {
        product: "PPH439BL2X3X",
        description: "ProVent Plus Emergency Medical Garment Coverall",
        price: 568.97,
        quantity: 1,
      },
    ],
  },
  {
    id: "SQN0003005",
    creator: "EAJ",
    purchaserName: "Anthony",
    purchaserEmail: "ahinkle@kappler.com",
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
        product: "D2H440HYSMMD9212",
        description: "DuraChem 200 NFPA 1990 Coverall",
        price: 1182.94,
        quantity: 2,
      },
      {
        product: "D2H440CPHYLGXL9212",
        description: "DuraChem 200 NFPA 1990 Coverall with CP Cuff",
        price: 1284.07,
        quantity: 1,
      },
      {
        product: "D2H443HY2X3X9212",
        description: "DuraChem 200 NFPA 1990 Coverall with Hood",
        price: 1377.71,
        quantity: 1,
      },
    ],
  },
  {
    id: "SQN0003006",
    creator: "EAJ",
    purchaserName: "Matt",
    purchaserEmail: "mmorris@kappler.com",
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
        product: "D5H457KHSMMD6E",
        description: "DuraChem 500 Non-Encapsulating Coverall",
        price: 1501.5,
        quantity: 1,
      },
      {
        product: "D5H457KHLGXL94",
        description: "DuraChem 500 NFPA 1990 Ensemble",
        price: 1974.39,
        quantity: 1,
      },
      {
        product: "D5H458KH2X3X94",
        description: "DuraChem 500 NFPA 1990 Ensemble",
        price: 2171.83,
        quantity: 2,
      },
    ],
  },
  {
    id: "SQN0003007",
    creator: "EAJ",
    purchaserName: "Johnathan",
    purchaserEmail: "jnodderman@kappler.com",
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
        product: "Z1B414XPBLSMMD",
        description: "Zytron 100 XP Coverall",
        price: 238.38,
        quantity: 4,
      },
      {
        product: "Z1B417XPBLLGXL",
        description: "Zytron 100 XP Coverall",
        price: 190.62,
        quantity: 3,
      },
      {
        product: "Z1B428XPBL2X3X",
        description: "Zytron 100 XP Coverall",
        price: 232.12,
        quantity: 2,
      },
    ],
  },
];

export const quotes: Quote[] = [exampleQuote, ...otherQuotes];
