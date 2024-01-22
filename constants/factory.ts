import contractABI from "@/constants/contractABI.json";

export const veritrustFactoryAddressGoerli: `0x${string}` = process.env.NEXT_PUBLIC_TEST_CONTRACT?.startsWith("0x") ?
    process.env.NEXT_PUBLIC_TEST_CONTRACT as `0x${string}` : "0x0a73BaeAB54C40e403D34fF2631C0D0361bA3422";

export const contractABIGoerli = contractABI;