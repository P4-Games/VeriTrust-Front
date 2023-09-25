import React from "react";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { JsonRpcProvider } from "ethers";

type WagmiProviderType = {
  children: React.ReactNode;
};

const chains = [goerli];
const projectId = "2df4c8bd4b7b61692d938d3704dde521";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const WagmiProvider = ({ children }: WagmiProviderType) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        {children}
      </WagmiConfig>
    </>
  );
};

export default WagmiProvider;