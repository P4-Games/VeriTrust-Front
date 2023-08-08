export type Tender = {
    txid: string;
    name: string;
    type: "Licitacion Pública" | "Licitacion Privada";
    opening_date: string;
    //TBC
}

export const DUMMY_TENDERS: Tender[] = [
    {
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de elementos de protección personal",
        type: "Licitacion Pública",
        opening_date: "03/08/2023 - 08:00",
    },
    {
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición indumentaria textil",
        type: "Licitacion Privada",
        opening_date: "04/08/2023 - 10:00",
    },
    {
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de tornillos y accesorios",
        type: "Licitacion Pública",
        opening_date: "05/08/2023 - 12:00",
    },
    {
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de Medicamentos Gastrológicos",
        type: "Licitacion Privada",
        opening_date: "06/08/2023 - 14:00",
    },
    {
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Adquisición de arena abrasiva",
        type: "Licitacion Pública",
        opening_date: "07/08/2023 - 16:00",
    },
    {
        txid: "0x6957f607c4b9780a34ece29e98a17beb63933553daa8e2e4e57599147b485ab8",
        name: "Cableado para equipo de rayos X",
        type: "Licitacion Privada",
        opening_date: "08/08/2023 - 18:00",
    }
];