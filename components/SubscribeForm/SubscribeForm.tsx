"use client";
import React, { useState } from "react";
import styles from "./SubscribeForm.module.scss";
import { Langs } from "@/utils/ip";

interface SubscribeFormProps {
  lang?: Langs;
}

export default function SubscribeForm({ lang = "EN" }: SubscribeFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(email);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <input
        type="email"
        placeholder={lang == "EN" ? "example@domain.com" : "ejemplo@dominio.com"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{lang == "EN" ? "Subscribe" : "Suscribirse"}</button>
    </form>
  );
}
