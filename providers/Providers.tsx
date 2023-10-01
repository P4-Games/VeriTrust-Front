"use client"
import React from 'react'
import WagmiProvider from './WagmiProvider'
import { I18nProvider } from "@lingui/react";
import { useLinguiInit } from '@/translations/utils'

type ProviderType = {
  children: React.ReactNode,
}

const Providers = ({children}: ProviderType) => {
  const initializedI18n = useLinguiInit(pageProps.i18n);
  return (
    <I18nProvider i18n={initializedI18n}>
      <WagmiProvider>{children}</WagmiProvider>
    </I18nProvider>
  )
}

export default Providers