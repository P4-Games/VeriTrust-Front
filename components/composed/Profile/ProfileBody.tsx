'use client';
import React, { useEffect, useState } from "react";
import styles from "../../../app/profile/Profile.module.scss";
import { Button } from "@/components/Button/Button";
import { IconExternalLink, IconPlus, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MY_QUOTES, QuoteState } from "@/constants/profile";
import { formatAddress, formatTX } from "@/utils/format";
import { Timeline } from "../Tender/Timeline/Timeline";
import { useAccount, useEnsName } from "wagmi";

export const ProfileBody = ()=>{
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const [isWalletConnected, setIsConnected] = useState<boolean>(true);
    const [quotes, setQuotes] = useState<QuoteState[]>([]);
    const [sectionType, setSectionType] = useState<"offers" | "tenders">("offers"); // My offers or My tenders
    const [description, setDescription] = useState<string>("Wallet no conectada");

    useEffect(() => {
        setIsConnected(isConnected);
        if(isConnected){
            setQuotes(MY_QUOTES);
            if(address && address.length > 0) {
                setDescription(ensName ? ensName : formatAddress(address))
            }
        }
    }, [isConnected])

    return (
        <>
            <section className={styles.profile_header}>
                <h1>Mi Perfil - Ejemplo S.A</h1>
                <p>30-12345678-5 • <span>{description}</span></p>
            </section>
            <div className={styles.profile_actions}>
                <Button
                    type="main"
                    onClick={() => router.push("/crear-licitacion")}
                >
                    <IconPlus/> Crear licitacion
                </Button>
                <Button
                    type="alt"
                    onClick={() => window.open("https://opensea.io/", "_blank", "noopener noreferrer")}
                >
                    <IconUser /> Ver mi perfil
                </Button>
            </div>
            <h3 className={styles.profile_title}>
                Estado de mis ofertas
            </h3>
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
        </>
    )
}