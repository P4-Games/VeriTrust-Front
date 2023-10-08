"use client";
import styles from "./[locale]/page.module.scss";
import { logo } from "@/assets";
import Image from "next/image";
import { cubicBezier, motion } from "framer-motion";
import { Loading } from "@/components/Loading/Loading";
import Flag from "react-world-flags";

export default function Home() {
    const redirect = (lang: string) => window.location.href = `/${lang}`;

    const handleES = () => redirect("es");
    const handleEN = () => redirect("en");
    const handlePT = () => redirect("pt");

    return (
        <>
            <main className={styles.main}>
                <Loading />
                {/*<DetectLanguage /> */}
                <header className={styles.logo}>
                    <Image width={60} height={60} src={logo} alt="VeriTrust logo" />
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
                            Choose your language
                        </motion.h2>
                        <section className={styles.lang}>
                            <section tabIndex={1} onClick={handleES}>
                                <Flag code="ES" />
                                <p>Español</p>
                            </section>
                            <section tabIndex={2} onClick={handleEN}>
                                <Flag code="US" />
                                <p>English</p>
                            </section>
                            <section tabIndex={3} onClick={handlePT}>
                                <Flag code="BR" />
                                <p>Português</p>
                            </section>
                        </section>
                    </div>
                </section>
            </main>
        </>
    );
}
