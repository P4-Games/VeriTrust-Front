import { Button } from "@/components/Button/Button";
import { QuoteState } from "@/constants/profile";
import { formatTX } from "@/utils/format";
import React from "react";

import styles from "../../../app/profile/Profile.module.scss";

import { IconExternalLink } from "@tabler/icons-react";
import { Timeline } from "../Tender/Timeline/Timeline";

interface QuotesTableProps {
    quotes: QuoteState[];
}

export const QuotesTable = ({ quotes }: QuotesTableProps)=>{
    return (
        <React.Fragment>
            <section className={styles.profile_table}>
                <section className={styles.profile_tableHead}>
                    <h3>TX Proceso</h3>
                    <h3>Nombre</h3>
                    <h3>Tipo</h3>
                    <h3>Estado</h3>
                </section>
                <section className={styles.profile_tableBody}>
                    {
                        quotes.map((item: QuoteState, index) => {
                            return (
                                <div className={styles.profile_tableRow} key={index}>
                                    <p>{formatTX(item.txid)}</p>
                                    <p>{item.name}</p>
                                    <p>{item.type}</p>
                                    <p>{item.status}</p>
                                    <Button
                                        redirectTo={`/tender/${item.txid}`}
                                        className={styles.profile_listItemButton}
                                    >
                                        Ver Detalles <IconExternalLink />
                                    </Button>
                                    <section className={styles.profile_tableRowTimeline}>
                                        <Timeline
                                            current={item.stage}
                                            state={item.status}
                                            total={4}
                                            stageText={item.stageText}
                                            txid={item.txid}
                                        />
                                    </section>
                                </div>
                            )
                        })
                    }
                </section>
            </section>
            {
                quotes && quotes.length === 0 ? ( 
                    <section className={styles.profile_header}>
                        <p>Conecte una wallet para ver tu perfil y hacer un seguimiento de tus ofertas o licitaciones</p>
                    </section>
                ) : null
            }
        </React.Fragment>
    )
}