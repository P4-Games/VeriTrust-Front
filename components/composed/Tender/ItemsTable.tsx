import styles from "./Table.module.scss";

import { TenderItem } from "@/constants/tender";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { TableItem } from "./TableItem";

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
  return (
    <section className={styles.table}>
      <section className={styles.table_head}>
        <h3>#</h3>
        <h3>Object of expense</h3>
        <h3>Item code</h3>
        <h3>Description</h3>
        {setAllQuotes && <h3>Unit price</h3>}
        <h3>Quantity</h3>
      </section>
      <section className={styles.table_body}>
        {items.map((item, index) => (
          <>
            <TableItem
              item={item}
              key={index}
              pricePerUnit={allQuotes[item.id]}
              setPricePerUnit={(value: number) => {
                if (!setAllQuotes) return;
                const newAllQuotes = [...allQuotes];
                newAllQuotes[item.id] = value;
                setAllQuotes(newAllQuotes);
              }}
            />
          </>
        ))}
      </section>
    </section>
  );
};
