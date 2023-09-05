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
        businessName: "Company 1",
        cuit: "20-12345678-9",
        businessAddres: "123 Example Street",
        address: "0x1234567890123456789012345678901234567890",
        fields: ["Technology", "Finance"],
    },
    {
        totalPrice: 200000,
        businessName: "Company 2",
        cuit: "20-12345678-9",
        businessAddres: "123 Example Street",
        address: "0x1234567890123456789012345678901234567891",
        fields: ["Technology"],
    },
    {
        totalPrice: 300000,
        businessName: "Company 3",
        cuit: "20-12345678-9",
        businessAddres: "123 Example Street",
        address: "0x1234567890123456789012345678901234567892",
        fields: ["Technology"],
    },
    {   
        totalPrice: 400000,
        businessName: "Company 4",
        cuit: "20-12345678-9",
        businessAddres: "123 Example Street",
        address: "0x1234567890123456789012345678901234567893",
        fields: ["Finance"],
    },
    {
        totalPrice: 500000,
        businessName: "Company 5",
        cuit: "20-12345678-9",
        businessAddres: "123 Example Street",
        address: "0x1234567890123456789012345678901234567894",
        fields: ["Textile"],
    }
]