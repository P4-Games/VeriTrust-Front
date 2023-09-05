"use client";
import React, { useState } from "react";
import styles from "./SubscribeForm.module.scss";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(email);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <input
        type="email"
        placeholder="ejemplo@dominio.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
