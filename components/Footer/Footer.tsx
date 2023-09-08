'use client';
import React, { useEffect, useState } from "react";
import { logo } from "@/assets";
import Image from "next/image";
import styles from "./Footer.module.scss";
import { Langs } from "@/utils/ip";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";

interface FooterProps {
  lang?: Langs;
}
export default function Footer({ lang = "EN" }: FooterProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (lang: Langs) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  return (
    <footer className={styles.footer}>
      <section className={styles.footer_lang}>
        <button
          onClick={() => setOpen(!open)}
          className={styles.footer_lang_button}
        >
          {lang == "EN" ? "Language" : "Idioma "}
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
                <button onClick={() => handleChange("EN")}>English</button>
                <button onClick={() => handleChange("ES")}>Español</button>
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
        <p>{lang == "EN" ? "Created during" : "Creado en"} EthArgentina 2023</p>
      </section>
    </footer>
  );
}
