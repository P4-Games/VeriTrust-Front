"use client";
import React from "react";
import WagmiProvider from "./WagmiProvider";
import UrqlProvider from "./UrqlProvider";

type ProviderType = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <UrqlProvider>
      <WagmiProvider>{children}</WagmiProvider>
    </UrqlProvider>
  );
};

export default Providers;
