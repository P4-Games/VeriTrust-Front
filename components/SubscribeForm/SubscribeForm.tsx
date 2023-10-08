"use client";
import React, { useState } from "react";
import styles from "./SubscribeForm.module.scss";
import { Langs } from "@/utils/ip";
import { useTranslations } from "next-intl";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  const t = useTranslations('Index');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <input
        type="email"
        placeholder={t("newsletter_placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{t("newsletter_button")}</button>
    </form>
  );
}
