"use client";
import styles from "../page.module.scss";
import extendedStyles from "./page.module.scss";
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
import Link from "next/link";
import { Building } from "@/components/Services/Image";
import { ContactForm } from "@/components/Services/ContactForm";
import { useRouter } from "next/navigation";

export default function Home() {
    const pattern = " • VeriTrust";
    const repetitions = 42;
    const t = useTranslations("Services");
    const i = useTranslations("Index");
    const router = useRouter();

    const handleOpenHome = ()=>router.push("/");
    return (
        <>
            <main className={styles.main}>
                <Loading />
                {/*<DetectLanguage /> */}
                <header className={styles.header}>
                    <Image width={60} height={60} src={logo} alt="VeriTrust logo" onClick={handleOpenHome}/>
                    <div className={styles.header_links}>
                        <Link href={"/services"}>
                            {i("nav_org")}
                        </Link>
                        <Link href={"/team"}>
                            {i("nav_team")}
                        </Link>
                        <LangButton />
                    </div>
                </header>
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
                    <div className={extendedStyles.image}>
                        <Building />
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
                        <Button className={extendedStyles.button} redirectTo="#contact">
                            {t("button")}
                        </Button>
                    </motion.div>
                    <div className={extendedStyles.scroll_text}>
                        <SeeMore showMouse={false} />
                    </div>
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
                            {t("characteristics_description4")}
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

                <section className={styles.third_section} id="contact">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, ease: cubicBezier(0.6, 0.6, 0, 0.1) }}
                    >
                        {t("contact")}
                    </motion.h2>
                    <ContactForm />
                </section>
            </main>
            <Footer />
        </>
    );
}
