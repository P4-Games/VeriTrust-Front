import { DEFAULT_TENDER, Tender } from "@/constants/tender";
import { ALCHEMY_API_URL } from "./marketplace";
import Web3 from "web3";
import { Alchemy, Network } from "alchemy-sdk";

export const getTender = async (id: string): Promise<Tender> => {
    let res: Tender = DEFAULT_TENDER;

    if(id.length < 64) return res;

    const web3 = new Web3(ALCHEMY_API_URL);
    const settings = {
        apiKey: "ybGQr_yqjMQV4RHXO_Z2BR8K5TuUwbER",
        network: Network.ETH_GOERLI,
    };

    const alchemy = new Alchemy(settings);
    const transaction = await alchemy.transact.getTransaction(id);
    const data = transaction?.data;
    if (data) {
        const input = web3.utils.hexToAscii(data).replace(/\u0000/g, "").slice(24);
        const ipfsHash = input.slice(-46);
        const title = input.slice(0, -47);

        const transactionDetails = {
            hash: id,
            input: {
                title: title,
                ipfsHash: ipfsHash,
            },
        };

        const ipfsData = await fetch("https://gateway.pinata.cloud/ipfs/" + transactionDetails.input.ipfsHash)
        
        const ipfsDataJSON = await ipfsData.json();

        res = ipfsDataJSON;
        res.txid = id;

        if(res.currency && res.currency.includes(", ")){
            res.currency = res.currency.split(", ")[0];
        }else{
            res.currency = "ARS";
        }
    }

    return res;
}