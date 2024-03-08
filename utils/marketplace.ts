import { Network, Alchemy, AssetTransfersCategory } from 'alchemy-sdk';
import { NEXT_BUILTIN_DOCUMENT } from 'next/dist/shared/lib/constants';
import React from 'react';
import Web3 from 'web3';
export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY;
export const ALCHEMY_API_URL = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
export const CONTRACT_ADDRESS = "0x0a73BaeAB54C40e403D34fF2631C0D0361bA3422";
export const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";
export const EXPLORER_URL = "https://goerli.etherscan.io/tx/";

export type TransactionDetails = {
    hash: string;
    input: {
        title: string;
        ipfsHash: string;
    }
}

export const getTXFromLS = (hash: string): TransactionDetails | null => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const transaction = transactions.find((t: TransactionDetails) => t.hash === hash);
    return transaction || null;
};

export const saveTXLS = (transaction: TransactionDetails): void => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
};


export const listTransactions = async (setLoading: React.Dispatch<React.SetStateAction<boolean>>, setTenders: React.Dispatch<React.SetStateAction<TransactionDetails[]>> ) => {
    if(setLoading) setLoading(true);
    const web3 = new Web3(ALCHEMY_API_URL);
    const settings = {
        apiKey: ALCHEMY_API_KEY,
        network: Network.ETH_GOERLI,
    };

    let transactionsWithData = [];

    const alchemy = new Alchemy(settings);

    const getTransfers = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: "0x0a73BaeAB54C40e403D34fF2631C0D0361bA3422",
        toBlock: "latest",
        excludeZeroValue: true,
        withMetadata: true,
        category: ["external"] as AssetTransfersCategory[],
    });

    if(getTransfers?.transfers){
        // As input data is not provided, loop through the transfers
        // If txs exist in Local Storage then use that data in order to be faster
        for (const element of getTransfers.transfers) {
            const transactionDetails = getTXFromLS(element.hash);
            if (transactionDetails) {
                transactionsWithData.push(transactionDetails);
            } else {
                const transaction = await alchemy.transact.getTransaction(element.hash);
                const data = transaction?.data;
                if (data) {
                    const input = web3.utils.hexToAscii(data).replace(/\u0000/g, "").slice(24);
                    const ipfsHash = input.slice(-46);
                    let title = "";
                    const ipfsData = await fetch(
                        "https://ipfs.io/ipfs/" + ipfsHash
                    );
                    const ipfsDataJSON = await ipfsData.json();
                    console.log(ipfsDataJSON);
                    title = ipfsDataJSON?.name ?? "";

                    const transactionDetails = {
                        hash: element.hash,
                        input: {
                            title: title,
                            ipfsHash: ipfsHash,
                        },
                    };

                    saveTXLS(transactionDetails);

                    transactionsWithData.push(transactionDetails);
                }
            }
        }
    }
    if (setLoading) setLoading(false);
    if (setTenders) setTenders(transactionsWithData);
}