'use client'
import { Navbar } from "@/components/composed/Navbar/Navbar";

import styles from "./Profile.module.scss";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { ProfileBody } from "@/components/composed/Profile/ProfileBody";


// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_KEY || "" }), publicProvider()],
)

// Set up wagmi config
const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'veritrust',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: process.env.WALLETCONNECT_ID || "",
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
})

export default function Profile(): JSX.Element {
    return (
        <div>
            <Navbar />
            <section className={styles.profile}>
                <WagmiConfig config={config}>
                    <ProfileBody />
                </WagmiConfig>
            </section>
        </div>
    )
}

