'use client';
import styles from "../../app/[locale]/page.module.scss";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const SeeMore = () => {
    const t = useTranslations('Index');

    return (
        <>
            <div className={styles.scroll_text}>
                <p>{t("scroll")}</p>
                <motion.img 
                    initial={{ y: 0, opacity: 0}}
                    animate={{ y: 10, opacity: 1}}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5}}
                    src={"/mouse.svg"}
                />
            </div>
        </>
    )
}
