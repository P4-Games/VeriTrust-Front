import React from "react";

import { Navbar } from "@/components/composed/Navbar/Navbar";

import styles from "./Marketplace.module.scss";
import { Button } from "@/components/Button/Button";
import { IconPlus, IconExternalLink } from "@tabler/icons-react";
import { DUMMY_TENDERS } from "@/constants/tender";
import { formatTX } from "@/utils/format";

export default function Marketplace(): JSX.Element{
    return (
        <div>
            <Navbar />
            <section className={styles.marketplace}>
                <section className={styles.marketplace_header}>
                    <div>
                        <h1>Marketplace</h1>
                        <p>Participa de licitaciones y crea nuevas, de manera confiable, segura y transparente</p>
                    </div>
                    <Button
                        type="main"
                    >
                        <IconPlus/> Crear licitacion
                    </Button>
                </section>
                <section className={styles.marketplace_filters}></section>
                <section className={styles.marketplace_list}>
                    <div className={styles.marketplace_listHeader}>
                        <h3>TX Proceso</h3>
                        <h3>Nombre</h3>
                        <h3>Tipo</h3>
                        <h3>Fecha de apertura</h3>
                    </div>
                    {
                        DUMMY_TENDERS.map((tender, index) => (
                            <div className={styles.marketplace_listItem} key={index}>
                                <p className={styles.marketplace_listItemTX}>{formatTX(tender.txid)}</p>
                                <p>{tender.name}</p>
                                <p>{tender.type}</p>
                                <p>{tender.opening_date}</p>
                                <Button
                                    redirectTo={`/tender/${tender.txid}`}
                                    className={styles.marketplace_listItemButton}
                                >
                                    Ver Detalles <IconExternalLink />
                                </Button>
                            </div>
                        ))
                    }
                </section>
            </section>
        </div>
    )
}

