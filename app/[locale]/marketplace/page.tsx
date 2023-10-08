
import { Navbar } from "@/components/composed/Navbar/Navbar";

import styles from "./Marketplace.module.scss";
import { Button } from "@/components/Button/Button";
import { IconPlus } from "@tabler/icons-react";
import { TenderList } from "@/components/TenderList/TenderList";

export default function Marketplace(): JSX.Element {
  return (
    <div>
      <Navbar />
      <section className={styles.marketplace}>
        <section className={styles.marketplace_header}>
          <div>
            <h1>Marketplace</h1>
            <p>
              Participate in tenders and create new ones, in a reliable,
              secure and transparent manner.
            </p>
          </div>
          <Button type="main" redirectTo="/create-tender">
            <IconPlus /> Create tender
          </Button>
        </section>
        <section className={styles.marketplace_filters}></section>
        <TenderList />
      </section>
    </div>
  );
}
