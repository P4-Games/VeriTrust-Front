import React, { useState, useEffect } from "react";
import styles from "./LangButton.module.scss";
import { useRouter } from "next/navigation";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { IconLanguage } from "@tabler/icons-react";
import useDocumentScroll from "@/hooks/useDocumentScroll";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";

export default function LangButton() {
  const router = useRouter();
  const [openLang, setOpenLang] = useState(false);
  const { currentScrollTop, previousScrollTop } = useDocumentScroll();

  const toggleLang = (lang: string) => {
    if (window.location.pathname.startsWith("/" + lang)) return; //If the pathname already starts with the current language, do nothing
    if (window.location.pathname === "/" || window.location.pathname === "") {
      router.push(`/${lang}`);
      return;
    }
    if (window.location.pathname.lastIndexOf("/") === 0) {
      //Replace the 2 first letters of the pathname after the / with the current language
      if (window.location.pathname.length === 3) {
        router.push(window.location.pathname.replace(/^\/.{2}/, `/${lang}`));
      } else {
        router.push(`/${lang}/` + window.location.pathname);
      }
      return;
    }
    //If the router has for example /es/create-tender or /create-tender (en), Add the language or replace accordingly
    router.push(window.location.pathname.replace(/\/.{2}\//, `/${lang}/`));
  };

  useEffect(() => {
    setOpenLang(false);
  }, [currentScrollTop, previousScrollTop]);

  return (
    <section className={styles.lang}>
      <button
        onClick={() => setOpenLang(!openLang)}
        className={styles.lang_button}
      >
        <IconLanguage />
        {/* {lang} */}
        {!openLang ? <IconChevronRight /> : <IconChevronDown />}
      </button>

      <AnimatePresence>
        {openLang ? (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.1,
              ease: cubicBezier(0.6, 0.6, 0, 0.1),
            }}
            className={styles.lang_options}
          >
            <ul>
              <li>
                <button onClick={() => toggleLang("en")}>English</button>
              </li>
              <li>
                <button onClick={() => toggleLang("es")}>Español</button>
              </li>
              <li>
                <button onClick={() => toggleLang("pt")}>Português</button>
              </li>
            </ul>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
