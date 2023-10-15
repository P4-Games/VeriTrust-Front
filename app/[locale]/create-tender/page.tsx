import styles from "./CreateTender.module.scss";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { CreateTenderForm } from "@/components/composed/Tender/CreateTenderForm/CreateTenderForm";
import { useTranslations } from "next-intl";

export default function CreateTender(): JSX.Element {
  const t = useTranslations("CreateTender");
  return (
    <>
      <Navbar />
      <section className={styles.breadcrumbs}>
        <Breadcrumb
          values={[
            [t("pageTitle"), "/marketplace"],
            // ["Tender details", "/tender/"],
          ]}
        />
      </section>
      <main className={styles.main}>
        <div className={styles.title}>
          <h3>{t("title")}</h3>
        </div>
        <CreateTenderForm />
      </main>
      <Footer />
    </>
  );
}
