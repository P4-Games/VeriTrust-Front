import styles from "./CreateTender.module.scss";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { CreateTenderForm } from "@/components/composed/Tender/CreateTenderForm/CreateTenderForm";

export default function CreateTender(): JSX.Element {
  return (
    <>
      <Navbar />
      <section className={styles.breadcrumbs}>
        <Breadcrumb
          values={[
            ["Tenders", "/marketplace"],
            // ["Tender details", "/tender/"],
          ]}
        />
      </section>
      <main className={styles.main}>
        <div className={styles.title}>
          <h3>Create tender</h3>
        </div>
        <CreateTenderForm />
      </main>
      <Footer />
    </>
  );
}
