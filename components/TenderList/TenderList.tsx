//Client component that displays all the tenders, and it's responsible for fetching or retrieving the TXs
'use client';
import styles from "@/app/marketplace/Marketplace.module.scss";
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { formatTX } from "@/utils/format";
import { IconExternalLink } from "@tabler/icons-react";
import { EXPLORER_URL, TransactionDetails, listTransactions } from "@/utils/marketplace";

export const TenderList = (): JSX.Element => {
    const [tenders, setTenders] = useState<TransactionDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        listTransactions(
            setLoading,
            setTenders
        );
    },[]);

    const handleTXClick = (tx: string) => {
        window.open(EXPLORER_URL + tx);
    }

    return (
        <section className={styles.marketplace_list}>
            <div className={styles.marketplace_listHeader}>
                <h3>TX Process</h3>
                <h3>Name</h3>
                <h3>Type</h3>
                <h3>Opening date</h3>
            </div>
            {tenders.map((tender, index) => (
                <div className={styles.marketplace_listItem} key={index}>
                    <button className={styles.marketplace_listItemTX} onClick={()=> handleTXClick(tender.hash)}>
                        {formatTX(tender.hash)}
                    </button>
                    <p className={styles.marketplace_listItemTitle}>{tender.input.title}</p>
                    <p>{/*tender.type*/}Public Tender</p>
                    <p>{/*tender.opening_date*/ }</p>
                    <Button
                        redirectTo={`/tender/${tender.hash}`}
                        className={styles.marketplace_listItemButton}
                    >
                        More details <IconExternalLink />
                    </Button>
                </div>
            ))}
            {
                loading ? (
                    <>
                        {
                            Array(5).fill(0).map((_, index) => (
                                <div className={styles.marketplace_listItemSkeleton} key={index}>
                                    <Skeleton width="80%" height="40px" />
                                    <Skeleton width="80%" height="40px" />
                                    <Skeleton width="80%" height="40px" />
                                    <Skeleton width="80%" height="40px" />
                                </div>
                            ))
                        }
                    </>
                ) : null
            }
        </section>
    )
}