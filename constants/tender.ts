export type TenderItem = {
  id: number; //Autoincremental
  object: string; //E.g. 2.2.2
  code: string; //E.g. 2.2.2-1629.210
  description: string; //E.g. "Cableado para equipo de rayos X"
  quantity: number | string; //E.g. 1
  deliveryPlace?: string; //E.g. "Constitucion 1234, CABA"
  deliveryDeadline?: string; //E.g. "3 months"
  additionalInfo?: string; // Free text
};

export type Tender = {
  [key: string]: any;
  txid: string;
  name: string;
  type: "Public tender" | "Private tender";
  opening_date: string;
  currency: string;
  scope: "Argentina" | null;
  requires_payment: boolean;
  allows_extension: boolean;
  categories: string[];
  quoteType: "All items" | "All items, or some of them";
  additionalInfo: [string, string][]; //Title and value of the custom input
  items: TenderItem[];
  specifications: string; //IPFS Hash (PDF) - Pliego
  approvingProvision: string; //IPFS Hash (PDF)
  financialRequirements: string;
  technicalRequirements: string;
  administrativeRequirements: string;
  clause: [string, string]; //Documento, Numero GDE, Numero especial, Fecha vinculación -> [datos, IPFS Hash (PDF)]
  warranty: string;
  penalties: string[];
  annexes: [string, string][]; //Title and IPFS Hash (PDF) of the annexes (array of tuples)
  dates: {
    inquiriesStart: string;
    inquiriesEnd: string;
    commitDeadline: string;
    revealDeadline: string;
    contractStart: string; // It should be "A partir del documento contractual"
    contractDuration: string; // E.g. "3 months"
    reveal?: string;
  };
};

//Create a default object based on the Tender types
export const DEFAULT_TENDER: Tender = {
  txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
  name: "",
  type: "Public tender",
  opening_date: "31/12/2023",
  currency: "ARS",
  scope: "Argentina",
  requires_payment: false,
  allows_extension: false,
  categories: ["Textile", "Personal Protection"],
  quoteType: "All items",
  additionalInfo: [["Company name", "ABC"]],
  items: [
    {
      id: 1,
      object: "2.2.2",
      code: "2.2.2-1629.210",
      description:
        "GLOVES; PROTECTION: ANTI-SLIP MOTIF, MATERIAL: COTTON AND PVC, TYPE: ANTI-SLIP PALM, INTERIOR: COTTON, LENGTH: STANDARD, CLOSURE: NONE, INTERNAL MATERIAL: COTTON",
      quantity: 800,
      additionalInfo: "Size: 10",
      deliveryDeadline: "3 months",
      deliveryPlace: "Constitucion 1234, CABA",
    },
    {
      id: 2,
      object: "2.2.2",
      code: "2.2.2-1629.283",
      description:
        "GLOVES; PROTECTION: FOR GENERAL TASKS, MATERIAL: COWHIDE, TYPE: 5 FINGERS, LENGTH: UP TO WRIST, CLOSURE: NONE, INTERNAL MATERIAL: NONE",
      quantity: 150,
      additionalInfo: "Size: 11",
      deliveryDeadline: "3 months",
      deliveryPlace: "Constitucion 1233, CABA",
    },
  ],
  specifications: "aaa123",
  approvingProvision: "aaa123",
  financialRequirements: "Description and type of document",
  technicalRequirements: "Description and type of document",
  administrativeRequirements: "Description and type of document",
  clause: ["Enter the necessary data", "aaa123"],
  warranty:
    "Enter the necessary data, e.g. guarantee of challenge to pre-award, compliance, etc.",
  penalties: ["ACCORDING TO ARTICLES 102 TO 105 OF DECREE 1030/2016"],
  annexes: [["Name/Type/Description of the annex", "aaa212"]],
  dates: {
    inquiriesStart: "20/11/2023 - 15:00",
    inquiriesEnd: "20/11/2023 - 15:00",
    commitDeadline: "20/11/2023 - 15:00",
    revealDeadline: "25/11/2023 - 15:00",
    contractStart: "From the contractual document",
    contractDuration: "3 months",
  },
};

const getTender = (extraData: Partial<Tender> = {}): Tender => {
  return {
    ...DEFAULT_TENDER,
    ...extraData,
  };
};
export const DUMMY_TENDERS: Tender[] = [
  getTender({
    txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
    name: "Acquisition of personal protective equipment",
    type: "Public tender",
    opening_date: "03/08/2023 - 08:00",
  }),
  getTender({
    txid: "0x6957f607c4b9780a34ece29e98a17beb62933553daa8e2e4e57599147b485ab7",
    name: "Acquisition of textile clothing",
    type: "Private tender",
    opening_date: "04/08/2023 - 10:00",
  }),
  getTender({
    txid: "0x6957f607c4b9780a34ece29e98a17beb61933553daa8e2e4e57599147b485ab6",
    name: "Acquisition of screws and accessories",
    type: "Public tender",
    opening_date: "05/08/2023 - 12:00",
  }),
  getTender({
    txid: "0x6957f607c4b9780a34ece29e98a17beb63963553daa8e2e4e57599147b485ab5",
    name: "Acquisition of Gastrological Medicines",
    type: "Private tender",
    opening_date: "06/08/2023 - 14:00",
  }),
  getTender({
    txid: "0x6957f607c4b9780a24ece29e98a17beb63933553daa8e2e4e57599147b485ab4",
    name: "Acquisition of abrasive sand",
    type: "Public tender",
    opening_date: "07/08/2023 - 16:00",
  }),
  getTender({
    txid: "0x6957f607c4b9780a31ece29e98a17beb63933553daa8e2e4e57599147b485ab3",
    name: "Wiring for X-ray equipment",
    type: "Private tender",
    opening_date: "08/08/2023 - 18:00",
  }),
];
