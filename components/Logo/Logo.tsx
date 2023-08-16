import Image from "next/image";
import React from "react";
import styles from "./Logo.module.scss"

interface Logo{
    mode?: "image" | "full" 
}

export const Logo = ({ mode = "full" }): JSX.Element => {
    return (
        <div className={styles.logo}>
            <Image src="/logo.svg" alt="VeriTrust Logo" quality={100} width={60} height={60} />
            {mode === "full" && <h3 className={styles.logo_title}>VeriTrust Protocol</h3>}
        </div>
    )
}