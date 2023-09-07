import { Network, Alchemy, AssetTransfersCategory } from 'alchemy-sdk';
import React from 'react';
import Web3 from 'web3';

export const ALCHEMY_API_KEY = "ybGQr_yqjMQV4RHXO_Z2BR8K5TuUwbER";
export const ALCHEMY_API_URL = "https://eth-goerli.g.alchemy.com/v2/ybGQr_yqjMQV4RHXO_Z2BR8K5TuUwbER";
export const CONTRACT_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
export const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";
export const EXPLORER_URL = "https://goerli.etherscan.io/tx/";

export type TransactionDetails = {
    hash: string;
    input: {
        title: string;
        ipfsHash: string;
    }
}

const getTXFromLS = (hash: string): TransactionDetails | null => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const transaction = transactions.find((t: TransactionDetails) => t.hash === hash);
    return transaction || null;
};

const saveTXLS = (transaction: TransactionDetails): void => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
};


export const listTransactions = async (setLoading: React.Dispatch<React.SetStateAction<boolean>>, setTenders: React.Dispatch<React.SetStateAction<TransactionDetails[]>> ) => {
    if(setLoading) setLoading(true);
    const web3 = new Web3(ALCHEMY_API_URL);
    const settings = {
        apiKey: "ybGQr_yqjMQV4RHXO_Z2BR8K5TuUwbER",
        network: Network.ETH_GOERLI,
    };

    let transactionsWithData = [];

    const alchemy = new Alchemy(settings);

    const getTransfers = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: "0xfCAc7c9c5326CF0BCE7a5fE05856ff543B9Fba9c",
        toBlock: "latest",
        excludeZeroValue: true,
        withMetadata: true,
        category: ["external"] as AssetTransfersCategory[],
    });

    if(getTransfers?.transfers){
        // As input data is not provided, loop through the transfers
        // If txs exist in Local Storage then use that data in order to be faster
        for (let i = 0; i < getTransfers.transfers.length; i++) {
            const element = getTransfers.transfers[i];
            const transactionDetails = getTXFromLS(element.hash);
            if (transactionDetails) {
                transactionsWithData.push(transactionDetails);
            } else {
                const transaction = await alchemy.transact.getTransaction(element.hash);
                const data = transaction?.data;
                if (data) {
                    const input = web3.utils.hexToAscii(data).replace(/\u0000/g, "").slice(24);
                    const ipfsHash = input.slice(-46);
                    const title = input.slice(0, -47);

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