export type TTenderOffer = {
    totalPrice: number;
    businessName: string;
    cuit: string;
    businessAddres: string;
    address: string;
    fields: string[];
}

export const DUMMY_TENDERS_OFFERS: TTenderOffer[] = [
    {
        totalPrice: 100000,
        businessName: "Empresa 1",
        cuit: "20-12345678-9",
        businessAddres: "Calle 123",
        address: "0x1234567890123456789012345678901234567890",
        fields: ["Technology", "Finance"],
    },
    {
        totalPrice: 200000,
        businessName: "Empresa 2",
        cuit: "20-12345678-9",
        businessAddres: "Calle 123",
        address: "0x1234567890123456789012345678901234567891",
        fields: ["Technology"],
    },
    {
        totalPrice: 300000,
        businessName: "Empresa 3",
        cuit: "20-12345678-9",
        businessAddres: "Calle 123",
        address: "0x1234567890123456789012345678901234567892",
        fields: ["Technology"],
    },
    {   
        totalPrice: 400000,
        businessName: "Empresa 4",
        cuit: "20-12345678-9",
        businessAddres: "Calle 123",
        address: "0x1234567890123456789012345678901234567893",
        fields: ["Finance"],
    },
    {
        totalPrice: 500000,
        businessName: "Empresa 5",
        cuit: "20-12345678-9",
        businessAddres: "Calle 123",
        address: "0x1234567890123456789012345678901234567894",
        fields: ["Textile"],
    }
]