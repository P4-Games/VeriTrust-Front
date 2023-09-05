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
    type: "Public tender" | "Private tender";
    opening_date: string;
    currency: string;
    scope: "Argentina" | null;
    requires_payment: boolean;
    allows_extension: boolean;
    categories: string[];
    quoteType: "Todos los items" | "Todos los items, o algunos";
    additionalInfo: [string, string][]; //Title and value of the custom input
    items: TenderItem[];
    pliego: string; //IPFS Hash (PDF) - Pliego
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
    txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
    name: "",
    type: "Public tender",
    opening_date: "31/12/2023",
    currency: "ARS",
    scope: "Argentina",
    requires_payment: false,
    allows_extension: false,
    categories: [
        "Textil",
        "Proteccion Personal",
    ],
    quoteType: "Todos los items",
    additionalInfo: [
        ["Nombre de la empresa", "ABC"],
    ],
    items: [
        {
            id: 1,
            object: "2.2.2",
            code: "2.2.2-1629.210",
            description: "GUANTES; PROTECCION: MOTEADO ANTIDESLIZANTE, MATERIAL: ALGODON Y PVC , TIPO: PALMA ANTIDESLIZANTE, INTERIOR: ALGODON, LARGO: STANDARD, CIERRE: SIN, MATERIAL INTERNO: ALGODON",
            quantity: 800,
            additionalInfo: "Talle: 10",
            deliveryDeadline: "3 meses",
            deliveryPlace: "Constitucion 1234, CABA",
        },
        {
            id: 2, 
            object: "2.2.2",
            code: "2.2.2-1629.283",
            description: "GUANTES; PROTECCION: P/TAREAS GENERALES, MATERIAL: CUERO VAQUETA, TIPO: 5 DEDOS, LARGO: HASTA MUÑECA, CIERRE: SIN, MATERIAL INTERNO: SIN",
            quantity: 150,
            additionalInfo: "Talle: 11",
            deliveryDeadline: "3 meses",
            deliveryPlace: "Constitucion 1233, CABA",
        }
    ],
    pliego: "aaa123",
    disposicionAprobatoria: "aaa123",
    financialRequirements: "Descripción y tipo de documento",
    technicalRequirements: "Descripción y tipo de documento",
    administrativeRequirements: "Descripción y tipo de documento",
    clause: ["Ingresar los datos necesarios", "aaa123"],
    warranty: "Ingresar los datos necesarios, ej. garantía de impugnación a la preadjudicacion, cumplimiento, etc",
    penalties: [
        "DE ACUERDO A LOS ARTÍCULOS 102 AL 105 DEL DECRETO 1030/2016"
    ],
    annexes: [
        ["Nombre/Tipo/Descripción del anexo", "aaa212"]
    ],
    dates: {
        inquiriesStart: "20/11/2023 - 15:00",
        inquiriesEnd: "20/11/2023 - 15:00",
        reveal: "20/11/2023 - 15:00",
        contractStart: "A partir del documento contractual",
        contractDuration: "3 meses",
    },
};

const getTender = (extraData: Partial<Tender> = {}): Tender => {
    return {
        ...DEFAULT_TENDER,
        ...extraData,
    };
}
export const DUMMY_TENDERS: Tender[] = [
    getTender({
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de elementos de protección personal",
        type: "Public tender",
        opening_date: "03/08/2023 - 08:00",
    }),
    getTender({
        txid: "0x6957f607c4b9780a34ece29e98a17beb62933553daa8e2e4e57599147b485ab7",
        name: "Adquisición indumentaria textil",
        type: "Private tender",
        opening_date: "04/08/2023 - 10:00",
    }),
    getTender({
        txid: "0x6957f607c4b9780a34ece29e98a17beb61933553daa8e2e4e57599147b485ab6",
        name: "Adquisición de tornillos y accesorios",
        type: "Public tender",
        opening_date: "05/08/2023 - 12:00",
    }),
    getTender({
        txid: "0x6957f607c4b9780a34ece29e98a17beb63963553daa8e2e4e57599147b485ab5",
        name: "Adquisición de Medicamentos Gastrológicos",
        type: "Private tender",
        opening_date: "06/08/2023 - 14:00",
    }),
    getTender({
        txid: "0x6957f607c4b9780a24ece29e98a17beb63933553daa8e2e4e57599147b485ab4",
        name: "Adquisición de arena abrasiva",
        type: "Public tender",
        opening_date: "07/08/2023 - 16:00",
    }),
    getTender({
        txid: "0x6957f607c4b9780a31ece29e98a17beb63933553daa8e2e4e57599147b485ab3",
        name: "Cableado para equipo de rayos X",
        type: "Private tender",
        opening_date: "08/08/2023 - 18:00",
    })
];