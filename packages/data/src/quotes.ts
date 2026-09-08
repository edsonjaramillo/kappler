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
        product: "D2H632SMMD9212",
        description: "DuraChem 200 NFPA 1990 Multi-Piece Configuration",
        price: 1739.23,
        quantity: 1,
      },
      {
        product: "D2H632LGXL9212",
        description: "DuraChem 200 NFPA 1990 Multi-Piece Configuration",
        price: 1739.23,
        quantity: 1,
      },
      {
        product: "D2H6322X3X9212",
        description: "DuraChem 200 NFPA 1990 Multi-Piece Configuration",
        price: 1913.18,
        quantity: 1,
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
        product: "F5H582SISMMD91",
        description: "Frontline 500 NFPA 1990 Vapor Total Encapsulating Suit",
        price: 3357.96,
        quantity: 1,
      },
      {
        product: "F5H582SILGXL91",
        description: "Frontline 500 NFPA 1990 Vapor Total Encapsulating Suit",
        price: 3357.96,
        quantity: 1,
      },
      {
        product: "F5H582SI2X3X91",
        description: "Frontline 500 NFPA 1990 Vapor Total Encapsulating Suit",
        price: 3693.75,
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
        product: "PVS414WHSMMD",
        description: "ProVent Coverall",
        price: 435.48,
        quantity: 1,
      },
      {
        product: "PVS414WHLGXL",
        description: "ProVent Coverall",
        price: 435.48,
        quantity: 1,
      },
      {
        product: "PVS414WH2X3X",
        description: "ProVent Coverall",
        price: 479.03,
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
        product: "D5H457KHSMMD94",
        description: "DuraChem 500 NFPA 1990 Vapor Non Encapsulating Tactical Suit",
        price: 1974.39,
        quantity: 1,
      },
      {
        product: "D5H457KHLGXL94",
        description: "DuraChem 500 NFPA 1990 Vapor Non Encapsulating Tactical Suit",
        price: 1974.39,
        quantity: 1,
      },
      {
        product: "D5H457KH2X3X94",
        description: "DuraChem 500 NFPA 1990 Vapor Non Encapsulating Tactical Suit",
        price: 2171.83,
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
        product: "Z3H414TNSMMD",
        description: "Zytron 300 Coverall",
        price: 475.72,
        quantity: 1,
      },
      {
        product: "Z3H414TNLGXL",
        description: "Zytron 300 Coverall",
        price: 475.72,
        quantity: 1,
      },
      {
        product: "Z3H414TN2X3X",
        description: "Zytron 300 Coverall",
        price: 523.28,
        quantity: 1,
      },
    ],
  },
  {
    id: "SQN0003007",
    creator: "EAJ",
    purchaserName: "Jonathan",
    purchaserEmail: "jnoterman@kappler.com",
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
        product: "Z1B417XPSMMD",
        description: "Zytron 100XP Coverall",
        price: 190.62,
        quantity: 1,
      },
      {
        product: "Z1B417XPLGXL",
        description: "Zytron 100XP Coverall",
        price: 190.62,
        quantity: 1,
      },
      {
        product: "Z1B417XP2X3X",
        description: "Zytron 100XP Coverall",
        price: 209.69,
        quantity: 1,
      },
    ],
  },
];

export const quotes: Quote[] = [exampleQuote, ...otherQuotes];
