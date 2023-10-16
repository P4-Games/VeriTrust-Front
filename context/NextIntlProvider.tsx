'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

interface NextIntlClientProviderProps {
    children: ReactNode;
    locale: string;
    messages: AbstractIntlMessages;
}

export const NextIntlProvider = ({
    children,
    messages,
    locale
}: NextIntlClientProviderProps) => (
    <NextIntlClientProvider 
        messages={messages}
        locale={locale}
        defaultTranslationValues={{
            i: (text) => <i>{text}</i>,
        }}
    >
        {children}
    </NextIntlClientProvider>
)