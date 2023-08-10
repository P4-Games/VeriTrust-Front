import React from "react";

import styles from "./Navbar.module.scss";
import { Logo } from "../Logo";
import { NAV_LINKS } from "@/constants/links";
import { Button } from "../Button";
import { Connect } from "../Connect";

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
                {/*<div className={styles.navbar_connect}>
                    <Button 
                        type="alt"
                    >
                        Connect Wallet
                    </Button>
                </div>*/}
                <Connect />
            </section>
        </nav>
    )
}