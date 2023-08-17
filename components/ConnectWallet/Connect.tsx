'use client';

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { ConnectButton } from './ConnectButton';
import { useEffect, useState } from 'react';

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
        projectId: "2df4c8bd4b7b61692d938d3704dde521" || "",
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

export const Connect = ({}): JSX.Element => {
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    setShowContent(true);
  }, []);
  
  return (
    <>
      {
      showContent ? (
          <WagmiConfig config={config}>
            <ConnectButton />
          </WagmiConfig>
        ) : null
      }
    </>
  )
}