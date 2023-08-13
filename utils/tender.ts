import { DEFAULT_TENDER, DUMMY_TENDERS, Tender } from "@/constants/tender"

export const getTender = async (id: string): Promise<Tender> => {
    const allTenders: Tender[] = DUMMY_TENDERS;
    let res: Tender = DEFAULT_TENDER;

    allTenders.forEach((tender: Tender) => {
        if (tender.txid === id) {
            res = tender;
        }
    })

    return res;
}