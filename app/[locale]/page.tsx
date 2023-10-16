"use client";
import styles from "./page.module.scss";
import { logo, marketplace, envelope } from "@/assets";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import SubscribeForm from "@/components/SubscribeForm/SubscribeForm";
import { Button } from "@/components/Button/Button";
import { cubicBezier, motion } from "framer-motion";
import { SeeMore } from "@/components/Scroll/SeeMore";
import { Loading } from "@/components/Loading/Loading";
import { useTranslations } from "next-intl";
import LangButton from "@/components/LangButton/LangButton";

export default function Home() {
  const pattern = " • VeriTrust";
  const repetitions = 42;
  const t = useTranslations("Index");

  return (
    <>
      <main className={styles.main}>
        <Loading />
        {/*<DetectLanguage /> */}
        <header className={styles.header}>
          <Image width={60} height={60} src={logo} alt="VeriTrust logo" />
          <LangButton />
        </header>
        <section className={styles.first_section}>
          <div className={styles.intro_text}>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.1,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: 0.3,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              {t("description")}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: 0.5,
              ease: cubicBezier(0.6, 0.6, 0, 0.1),
            }}
          >
            <Button className={styles.button} redirectTo="/marketplace">
              {t("button")}
            </Button>
          </motion.div>
          <SeeMore />
        </section>
        <section className={styles.second_section}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: cubicBezier(0.6, 0.6, 0, 0.1) }}
          >
            {t("heading2")}
          </motion.h2>
          <div className={styles.second_section_body}>
            <motion.div
              className={styles.marketplace}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: 0.1,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              <h3>{t("marketplace_title")}</h3>
              <p>{t("marketplace_description")}</p>
              <div className={styles.marketplace_img}>
                <Image
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", maxWidth: "450px" }}
                  src={marketplace}
                  alt="marketplace image"
                />
              </div>
            </motion.div>
            <div className={styles.characteristics}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: 0.2,
                  ease: cubicBezier(0.6, 0.6, 0, 0.1),
                }}
              >
                <div>
                  <h3>{t("characteristics_title")}</h3>
                  <p>{t("characteristics_description")}</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: 0.3,
                  ease: cubicBezier(0.6, 0.6, 0, 0.1),
                }}
              >
                <div>
                  <h3>{t("characteristics_title2")}</h3>
                  <p> {t("characteristics_description2")}</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: 0.3,
                  ease: cubicBezier(0.6, 0.6, 0, 0.1),
                }}
              >
                <div>
                  <h3>{t("characteristics_title3")}</h3>
                  <p>{t("characteristics_description3")}</p>
                </div>
              </motion.div>
            </div>
          </div>
          <div className={styles.characteristicsLast}>
            <h2>{t("characteristics_title4")}</h2>
            <p>
              {t("characteristics_description4")} <br /> <br />
              {t("characteristics_description4End")}{" "}
              <a href="mailto:team@veritrust.tdm.ar" target="_blank">
                team@veritrust.tdm.ar
              </a>
            </p>
          </div>
        </section>
        <div className={styles.repeat_pattern}>
          <motion.p
            initial={{ x: 0 }}
            whileInView={{ x: -100 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: cubicBezier(0.6, 0.6, 0, 0.1),
            }}
          >
            {Array(repetitions).fill(pattern).join("")}
          </motion.p>
        </div>

        <section className={styles.third_section}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: cubicBezier(0.6, 0.6, 0, 0.1) }}
          >
            {t("benefits_title")}
          </motion.h2>
          <div className={styles.card_container}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: 0.1,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              <h3>{t("benefits_item")}</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: 0.2,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              <h3>{t("benefits_item2")}</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: 0.3,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              <h3>{t("benefits_item3")}</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: 0.4,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              <h3>{t("benefits_item4")}</h3>
            </motion.div>
          </div>
        </section>
        <section className={styles.newsletter}>
          <motion.div
            className={styles.envelope_img}
            initial={{ opacity: 0, x: 250 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.1,
              delay: 0.5,
              ease: cubicBezier(0.6, 0.6, 0, 0.1),
            }}
          >
            <Image src={envelope} alt="envelop image" />
          </motion.div>
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -250 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.1,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              {t("newsletter")}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: 0.2,
                ease: cubicBezier(0.6, 0.6, 0, 0.1),
              }}
            >
              {t("newsletter_description")}
            </motion.p>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: 0.3,
              ease: cubicBezier(0.6, 0.6, 0, 0.1),
            }}
          >
            <SubscribeForm />
          </motion.span>
        </section>
      </main>
      <Footer />
    </>
  );
}
