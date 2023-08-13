import styles from "./Table.module.scss";

import { TenderItem } from "@/constants/tender";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { TableItem } from "./TableItem";


interface ItemsaTableProps{
    items: TenderItem[];
}
export const ItemsTable = ({items}: ItemsaTableProps) => {
    return (
        <section className={styles.table}>
            <section className={styles.table_head}>
                <h3>#</h3>
                <h3>Objeto del gasto</h3>
                <h3>Código del item</h3>
                <h3>Descripción</h3>
                <h3>Cantidad</h3>
            </section>
            <section className={styles.table_body}>
                {items.map((item, index) => (
                    <TableItem item={item} key={index}/>
                ))}
            </section>
        </section>
    )
}