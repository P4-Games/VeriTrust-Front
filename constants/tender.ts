export type TenderItem = {
    id: number; //Autoincremental
    object: string; //E.g. 2.2.2
    code: string; //E.g. 2.2.2-1629.210
    description: string; //E.g. "Cableado para equipo de rayos X"
    quantity: number; //E.g. 1
    deliveryPlace?: string; //E.g. "Constitucion 1234, CABA"
    deliveryDeadline?: string; //E.g. "3 months"
    additionalInfo?: string; // Free text
}

export type Tender = {
    txid: string;
    name: string;
    type: "Licitacion Pública" | "Licitacion Privada";
    opening_date: string;
    currency: string;
    scope: "Argentina" | null;
    requires_payment: boolean;
    allows_extension: boolean;
    categories: string[];
    quoteType: "Todos los items" | "Todos los items, o algunos";
    additionalInfo: [string, string][]; //Title and value of the custom input
    items: TenderItem[];
    specification: string; //IPFS Hash (PDF) - Pliego
    disposicionAprobatoria: string; //IPFS Hash (PDF)
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
        reveal: string;
        contractStart: string; // It should be "A partir del documento contractual"
        contractDuration: string; // E.g. "3 months"
    }
}

//Create a default object based on the Tender types
export const DEFAULT_TENDER: Tender = {
    txid: "",
    name: "",
    type: "Licitacion Pública",
    opening_date: "",
    currency: "ARS",
    scope: "Argentina",
    requires_payment: false,
    allows_extension: false,
    categories: [],
    quoteType: "Todos los items",
    additionalInfo: [],
    items: [],
    specification: "",
    disposicionAprobatoria: "",
    financialRequirements: "",
    technicalRequirements: "",
    administrativeRequirements: "",
    clause: ["", ""],
    warranty: "",
    penalties: [],
    annexes: [],
    dates: {
        inquiriesStart: "",
        inquiriesEnd: "",
        reveal: "",
        contractStart: "",
        contractDuration: "",
    },
};


export const DUMMY_TENDERS: Tender[] = [
    {
        ...DEFAULT_TENDER,
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de elementos de protección personal",
        type: "Licitacion Pública",
        opening_date: "03/08/2023 - 08:00",
    },
    {
        ...DEFAULT_TENDER,
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición indumentaria textil",
        type: "Licitacion Privada",
        opening_date: "04/08/2023 - 10:00",
    },
    {
        ...DEFAULT_TENDER,
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de tornillos y accesorios",
        type: "Licitacion Pública",
        opening_date: "05/08/2023 - 12:00",
    },
    {
        ...DEFAULT_TENDER,
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de Medicamentos Gastrológicos",
        type: "Licitacion Privada",
        opening_date: "06/08/2023 - 14:00",
    },
    {
        ...DEFAULT_TENDER,
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de arena abrasiva",
        type: "Licitacion Pública",
        opening_date: "07/08/2023 - 16:00",
    },
    {
        ...DEFAULT_TENDER,
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Cableado para equipo de rayos X",
        type: "Licitacion Privada",
        opening_date: "08/08/2023 - 18:00",
    }
];