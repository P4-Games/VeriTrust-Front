"use client";
import React, { useEffect, useState } from "react";
import { logo } from "@/assets";
import Image from "next/image";
import styles from "./Footer.module.scss";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className={styles.footer}>
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
