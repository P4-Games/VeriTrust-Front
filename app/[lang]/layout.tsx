import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import localFont from "next/font/local";
import Providers from "@/providers/Providers";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutProps } from "framer-motion";

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

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: { lang: AVAILABLE_LOCALES};
}
export default function RootLayout({
  children,
  params,
}: LayoutProps) {
  return (
    <html>
      <body className={SATOSHI.variable + " " + TASA_EXPLORER.variable}>
        <Providers pageProps={pageProps}>
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
      </body>
    </html>
  );
}
