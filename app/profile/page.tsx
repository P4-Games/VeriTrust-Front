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

export default function Profile(): JSX.Element {
    return (
        <div>
            <Navbar />
            <section className={styles.profile}>
                <ProfileBody />
            </section>
        </div>
    )
}

