"use client";
import styles from "../page.module.scss";
import extendedStyles from "./page.module.scss";
import { logo, marketplace } from "@/assets";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import { cubicBezier, motion } from "framer-motion";
import { Loading } from "@/components/Loading/Loading";
import { useTranslations } from "next-intl";
import LangButton from "@/components/LangButton/LangButton";
import Link from "next/link";
import { ContactForm } from "@/components/Services/ContactForm";
import { useRouter } from "next/navigation";
import { TEAM } from "@/constants/team";
import { IconBrandLinkedin } from "@tabler/icons-react";
import LandingHeader from "@/components/LandingHeader/LandingHeader";

export default function Home() {
  const pattern = " • VeriTrust";
  const repetitions = 42;
  const t = useTranslations("Team");
  const i = useTranslations("Index");
  const router = useRouter();

  const handleOpenHome = () => router.push("/");
  return (
    <>
      <main className={styles.main}>
        <Loading />
        {/*<DetectLanguage /> */}
        <LandingHeader />
        <section className={extendedStyles.first_section}>
          <div className={extendedStyles.intro_text}>
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
          </div>
        </section>
        <section className={extendedStyles.team_section}>
          {TEAM.map((item) => {
            return (
              <div className={extendedStyles.teamcard} key={item.name}>
                <h4 className={extendedStyles.teamcard__title}>{item.name}</h4>
                <p className={extendedStyles.teamcard__role}>
                  <b>{item.role}</b>
                </p>
                <p className={extendedStyles.teamcard__desc}>{item.desc}</p>
                <IconBrandLinkedin
                  onClick={() => item.linkedin && router.push(item.linkedin)}
                />
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
