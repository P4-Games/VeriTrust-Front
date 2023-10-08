'use client';
import React, { useEffect, useState } from "react";
import { logo } from "@/assets";
import Image from "next/image";
import styles from "./Footer.module.scss";
import { Langs } from "@/utils/ip";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Footer() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Footer');
  const router = useRouter();
  
  const toggleLang = (lang: string) => {
    //Replace the 2 first letters of the pathname after the / with the current language
    router.push(window.location.pathname.replace(/^\/.{2}/, `/${lang}`));
  }

  return (
    <footer className={styles.footer}>
      <section className={styles.footer_lang}>
        <button
          onClick={() => setOpen(!open)}
          className={styles.footer_lang_button}
        >
          {t("lang")}
          {
            !open ? (
              <IconChevronRight />
            ) : <IconChevronDown />
          }
        </button>
        <AnimatePresence>
          {
            open ? (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1, ease: cubicBezier(0.6, 0.6, 0, 0.1) }}
                className={styles.footer_lang_options}
              >
                <button onClick={() => toggleLang("en")}>English</button>
                <button onClick={() => toggleLang("es")}>Español</button>
              </motion.section>
            ) : null
          }
        </AnimatePresence>
      </section>
      <section className={styles.footer_bottom}>
        <div>
          <Image width={40} height={40} src={logo} alt="VeriTrust logo" />
          <p>VeriTrust</p>
        </div>
        <p>{t("createdBy")}</p>
      </section>
    </footer>
  );
}
