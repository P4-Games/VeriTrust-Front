"use client";
import React, { useEffect, useState, useRef } from "react";

import styles from "./Navbar.module.scss";
import { Logo } from "../../Logo/Logo";
import { NAV_LINKS } from "@/constants/links";
import { Button } from "../../Button/Button";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Web3Button } from "@web3modal/react";
import useDocumentScroll from "@/hooks/useDocumentScroll";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import LangButton from "@/components/LangButton/LangButton";
import Link from "next/link";

export const Navbar = (): JSX.Element => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const toggleMenu = () => setOpenMenu(!openMenu);
  const [show, setShow] = useState(false);
  const { currentScrollTop, previousScrollTop } = useDocumentScroll();

  useEffect(() => {
    if (window.scrollY < 108 || currentScrollTop > previousScrollTop) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [currentScrollTop, previousScrollTop]);

  return (
    <nav
      className={`${styles.navbar} ${show && styles.show} ${
        openMenu && styles.openMenu
      }`}
    >
      <Logo />
      <IconMenu2 className={styles.navbar_menuIcon} onClick={toggleMenu} />
      <AnimatePresence>
        {openMenu ? (
          <motion.section
            className={styles.navbar_linksMobile}
            initial={{ height: "auto" }}
            animate={{ height: "100vh" }}
            exit={{ height: "auto" }}
            transition={{ duration: 0.1, ease: cubicBezier(0.6, 0.6, 0, 0.1) }}
          >
            {NAV_LINKS.map((elem, index) => (
              <Button key={index} type="link" redirectTo={elem.link}>
                {elem.name}
              </Button>
            ))}
            <Web3Button />
            <LangButton />
            <Button
              type="link"
              className={styles.navbar_menuClose}
              onClick={toggleMenu}
            >
              <IconX /> Close menu
            </Button>
          </motion.section>
        ) : null}
      </AnimatePresence>
      <section className={styles.navbar_linksDesktop}>
        <div className={styles.navbar_linksDesktop_links}>
          {NAV_LINKS.map((elem, index) => (
            <Link key={index} href={elem.link}>
              {elem.name}
            </Link>
          ))}
        </div>
        <Web3Button />
        <LangButton />
      </section>
    </nav>
  );
};
