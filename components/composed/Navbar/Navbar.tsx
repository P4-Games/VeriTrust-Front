import React from "react";

import styles from "./Navbar.module.scss";
import { Logo } from "../../Logo/Logo";
import { NAV_LINKS } from "@/constants/links";
import { Button } from "../../Button/Button";
import { Connect } from "../../ConnectWallet/Connect";

export const Navbar = (): JSX.Element => {
    return (
        <nav className={styles.navbar}>
            <Logo />
            <section className={styles.navbar_links}>
                {
                    NAV_LINKS.map((link, index) => (
                        <Button 
                            key={index} 
                            type="link"
                            redirectTo={link[1]}
                        >{link[0]}</Button>
                    ))
                }
                <Connect />
            </section>
        </nav>
    )
}