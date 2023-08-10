/*
React context that it's used for 
passing the wallet details to the leaves of the app 
instead of making the whole app as a client
*/

import React, { useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';


interface WagmiContextProps {
    config: any;
    setConfig: any;
    client: any;
    setClient: any;
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    isConnected: boolean;
    setIsConnected: Dispatch<SetStateAction<boolean>>;
    connect: () => void;
    disconnect: () => void;
}


export const WagmiContext = React.createContext({
    config: null,
    setConfig: null,
    client: null,
    setClient: null,
    address: "",
    setAddress: (x: string)=>{},
    isConnected: false,
    setIsConnected: (x: boolean)=>{},
    connect: ()=>{},
    disconnect: ()=>{}
} as WagmiContextProps);

interface WagmiProviderProps {
    children: React.ReactNode;
}
export const WagmiProvider = ({ children }: WagmiProviderProps) => {
    const [config, setConfig] = useState<any>(null);
    const [client, setClient] = useState<any>(null);
    const [address, setAddress] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        if (config) {
            setClient(createPublicClient({
                chain: mainnet,
                transport: http()
            }));
        }
    }, [config]);

    const connect = async () => {
        await config.connect();
        setAddress(config.account.address);
        setIsConnected(true);
    }

    const disconnect = async () => {
        await config.disconnect();
        setAddress("");
        setIsConnected(false);
    }

    return (
        <WagmiContext.Provider
            value={{
                config,
                setConfig,
                client,
                setClient,
                address,
                setAddress,
                isConnected,
                setIsConnected,
                connect,
                disconnect,
            }}
        >
            {children}
        </WagmiContext.Provider>
    )
}