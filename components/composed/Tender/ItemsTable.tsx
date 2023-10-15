'use client';
import styles from "./Table.module.scss";

import { TenderItem } from "@/constants/tender";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { TableItem } from "./TableItem";
import { useTranslations } from "next-intl";

interface ItemsaTableProps {
  items: TenderItem[];
  allQuotes?: number[];
  setAllQuotes?: React.Dispatch<React.SetStateAction<number[]>>;
}
export const ItemsTable = ({
  items,
  allQuotes = [],
  setAllQuotes,
}: ItemsaTableProps) => {
  const t = useTranslations("BidTable");
  return (
    <section className={styles.table}>
      <section className={styles.table_head}>
        <h3>{t("i1")}</h3>
        <h3>{t("i2")}</h3>
        <h3>{t("i3")}</h3>
        <h3>{t("i4")}</h3>
        {setAllQuotes && <h3>{t("i5")}</h3>}
        <h3>{t("i6")}</h3>
      </section>
      <section className={styles.table_body}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <TableItem
              item={item}
              pricePerUnit={allQuotes[item.id]}
              setPricePerUnit={
                setAllQuotes ? (value: number) => {
                  if (!setAllQuotes) return;
                  const newAllQuotes = [...allQuotes];
                  newAllQuotes[item.id] = value;
                  setAllQuotes(newAllQuotes);
                } : undefined
              }
            />
          </React.Fragment>
        ))}
      </section>
    </section>
  );
};
