import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import localFont from "next/font/local";
import Providers from "@/providers/Providers";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlProvider } from "@/context/NextIntlProvider";

//Uso en el css: var(--font-satoshi)
export const SATOSHI = localFont({
  src: "Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const TASA_EXPLORER = localFont({
  src: "TASAExplorerVF.woff2",
  variable: "--font-tasa",
  display: "swap",
});

export const metadata = {
  title: "VeriTrust - Licita con confianza",
  description:
    "Seguridad, transparencia y confianza en los procesos de contratación.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }, { locale: "pt" }];
}

interface LayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {

  const locales = ["en", "es", "pt"];
  let messages;

  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body className={SATOSHI.variable + " " + TASA_EXPLORER.variable}>
        <NextIntlProvider messages={messages} locale={params.locale}>
          <Providers>
            <SkeletonTheme baseColor="#f9f9f980" highlightColor="#0066ff20">
              {children}
            </SkeletonTheme>
          </Providers>
          <ToastContainer
            position="bottom-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </NextIntlProvider>
      </body>
    </html>
  );
}
