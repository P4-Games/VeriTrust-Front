
import { Navbar } from "@/components/composed/Navbar/Navbar";

import styles from "./Marketplace.module.scss";
import { Button } from "@/components/Button/Button";
import { IconPlus } from "@tabler/icons-react";
import { TenderList } from "@/components/TenderList/TenderList";
import { useTranslations } from "next-intl";

export default function Marketplace(): JSX.Element {
  const t = useTranslations('Marketplace');

  return (
    <div>
      <Navbar />
      <section className={styles.marketplace}>
        <section className={styles.marketplace_header}>
          <div>
            <h1>{t("title")}</h1>
            <p>
              {t("subheading")}
            </p>
          </div>
          <Button type="main" redirectTo="/create-tender">
            <IconPlus /> {t("button")}
          </Button>
        </section>
        <section className={styles.marketplace_filters}></section>
        <TenderList />
      </section>
    </div>
  );
}
