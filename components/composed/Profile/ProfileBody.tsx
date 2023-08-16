import React from "react";
import styles from "../../../app/profile/Profile.module.scss";
import { Button } from "@/components/Button/Button";
import { IconExternalLink, IconPlus, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MY_QUOTES } from "@/constants/profile";
import { formatAddress, formatTX } from "@/utils/format";
import { Timeline } from "../Tender/Timeline/Timeline";
import { useAccount, useEnsName } from "wagmi";

export const ProfileBody = ()=>{
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    
    return (
        <>
            {
                isConnected ? (
                    <>
                        <section className={styles.profile_header}>
                            <h1>Mi Perfil - Ejemplo S.A</h1>
                            <p>30-12345678-5 • <span>{ensName ? ensName : formatAddress(address || "")}</span></p>
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
                                    MY_QUOTES.map((item) => {
                                        return (
                                            <div className={styles.profile_tableRow}>
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
                                                    />
                                                </section>
                                            </div>
                                        )
                                    })
                                }
                            </section>
                        </section>
                    </>
            ) : (
                <>
                    <section className={styles.profile_header}>
                        <h1>Mi Perfil - Ejemplo S.A</h1>
                        <p>Conecte una wallet para ver tu perfil y hacer un seguimiento de tus ofertas o licitaciones</p>
                    </section>
                </>
            )}
        </>
    )
}