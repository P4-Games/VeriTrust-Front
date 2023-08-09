import React from "react";
import { logo } from "../../_assets";
import Image from "next/image";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Image src={logo} alt="VeriTrust logo" />
        <p>VeriTrust</p>
      </div>
      <p>Creado para EthArgentina 2023</p>
    </footer>
  );
}
