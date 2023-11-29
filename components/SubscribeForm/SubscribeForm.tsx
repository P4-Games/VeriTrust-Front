"use client";
import React, { useState } from "react";
import styles from "./SubscribeForm.module.scss";
import { useTranslations } from "next-intl";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";

interface SubscribeFormProps {
  setNewsletterStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SubscribeForm({
  setNewsletterStatus,
}: SubscribeFormProps) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const t = useTranslations('Index');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    new Promise((resolve, reject) => {
      fetch("https://tdm.ar/api/veritrust_suscribe", {
        method: "POST",
        body: JSON.stringify({ "email": email, "lang": t("newsletter_lang")}),
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
          if(res?.message != "Sent!"){
            setError(res.message ?? "");
          }else{
            setNewsletterStatus(true);
          }
        });
    }).then((res) => {
      setEmail("");
      setLoading(false)
    });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <AnimatePresence>
        {
          !loading ? <motion.div
            initial={{width: 0, opacity: 0}}
            animate={{width: "min(100%, 700px)", opacity: 1}}
            exit={{width: 0, opacity: 0}}
            transition={{duration: 0.5, ease: cubicBezier(0.6, 0.6, 0, 1)}}
          ><input
            type="email"
            placeholder={t("newsletter_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /></motion.div> : null
        }
        </AnimatePresence>
        <button type="submit" className={!loading ? styles.form__button : styles.form__buttonLoading}>{!loading ? t("newsletter_button") : t("newsletter_sending")}</button>
      </form>
      <AnimatePresence>
        {
          error ? <motion.div
            className={styles.form__error}
            initial={{opacity: 0, height: 0, overflow: "hidden"}}
            animate={{opacity: 1, height: "auto", overflow: "visible"}}
            exit={{opacity: 0, height: 0, overflow: "hidden"}}
            transition={{duration: 0.5, ease: cubicBezier(0.6, 0.6, 0, 1)}}
          ><p>{error}</p></motion.div> : null
        }
      </AnimatePresence>
    </>
  );
}
