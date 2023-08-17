import { Tender } from "@/constants/tender";
import styles from "../../../app/tender/[id]/Tender.module.scss";
import React from "react";
import { SmallCard } from "@/components/SmallCard/SmallCard";
import { TenderCurrency } from "./Currency";
import { IconFileTypePdf, IconPdf, IconPremiumRights } from "@tabler/icons-react";
import { Button } from "@/components/Button/Button";
import { ItemsTable } from "./ItemsTable";

interface TenderBodyProps{
    tender: Tender;
}
export const TenderBody = ({tender}: TenderBodyProps) => {
    return (
        <section className={styles.details_body}>
            <section className={styles.details_bodyItem}>
                <p>Moneda y alcance: </p>
                <section className={styles.details_bodyRow}>
                    <TenderCurrency currency={tender.currency}/>
                    <SmallCard>
                        {tender.scope}
                    </SmallCard>
                </section>
            </section>
            <section className={styles.details_bodyItem}>
                <p>Requiere pago: {tender.requires_payment ? "Sí" : "No"} </p>
                <p>Se acepta prórroga: {tender.allows_extension ? "Sí" : "No" }</p>
            </section>
            <p><b>Rubro/s</b></p>
            <section className={styles.details_bodyItem}>
                {
                    tender.categories.map((category, index) => (
                        <SmallCard key={index}>
                            {category}
                        </SmallCard>
                    ))
                }
            </section>
            <p><b>Tipo de cotización</b></p>
            <section className={styles.details_bodyItem}>
                <SmallCard>
                    {tender.quoteType}
                </SmallCard>
            </section>
            <p><b>Campos Adicionales</b></p>
            <section className={styles.details_bodyItem}>
                {
                    tender.additionalInfo.map((info, index) => (
                        <section className={styles.details_bodyItem} key={index}>
                            <p>{info[0]}</p>
                            <SmallCard key={index}>
                                {info[1]}
                            </SmallCard>
                        </section>
                    ))
                }
            </section>
            <p><b>Detalle de productos o servicios</b></p>
            <ItemsTable items={tender.items} />
            <section className={styles.details_bodyRow}>
                <section className={styles.details_bodyItem}>
                    <p>Pliego de bases y condiciones</p>
                    <SmallCard className={styles.flagContainer}>
                        <IconFileTypePdf size={24} />
                        Ver pliego
                    </SmallCard>
                </section>
                <section className={styles.details_bodyItem}>
                    <p>Disposición aprobatoria</p>
                    <SmallCard className={styles.flagContainer}>
                        <IconFileTypePdf size={24} />
                        Ver disposición
                    </SmallCard>
                </section>
            </section>
            <p><b>Requisitos Mínimos de participación</b></p>
            <section className={styles.details_bodyItem}>
                <p>1. Requisitos económicos y financieros</p>
                <SmallCard>
                    {tender.financialRequirements}
                </SmallCard>
                <p>2. Requisitos técnicos</p>
                <SmallCard>
                    {tender.technicalRequirements}
                </SmallCard>
                <p>3. Requisitos administrativos</p>
                <SmallCard>
                    {tender.administrativeRequirements}
                </SmallCard>
            </section>
            <p><b>Cláusulas particulares</b></p>
            <section className={styles.details_bodyItem}>
                <p>Documento, Numero GDE, Numero especial, Fecha vinculación</p>
                <section className={styles.details_bodyRow}>
                    <SmallCard>
                        {tender.clause}
                    </SmallCard>
                    <SmallCard className={styles.flagContainer}>
                        <IconFileTypePdf size={24} />
                        Ver documento
                    </SmallCard>
                </section>  
            </section>
            <section className={styles.details_bodyItem}>
                <p>Garantías</p>
                <SmallCard>
                    {tender.warranty}
                </SmallCard>
            </section>
            <section className={styles.details_bodyItem}>
                <p>Penalidades</p>
                <SmallCard>
                    {
                        tender.penalties.map((penalty, index) => (
                            <p key={index}>{penalty}</p>
                        ))
                    }
                </SmallCard>
            </section>
            <section className={styles.details_bodyItem}>
                <p>Anexos</p>
                {
                    tender.annexes.map((annexes, index) => (
                        <section className={styles.details_bodyRow} key={index}>
                            <SmallCard>
                                {annexes[0]}
                            </SmallCard>
                            <SmallCard className={styles.flagContainer}>
                                <IconFileTypePdf size={24} />
                                Ver anexo
                            </SmallCard>
                        </section>
                    ))
                }
            </section>
            <p><b>Información adicional</b></p>
            <section className={styles.details_bodyItem}>
                <p>Fecha y hora de consultas</p>
                <section className={styles.details_bodyRow}>
                    <SmallCard>
                        {tender.dates.inquiriesStart}
                    </SmallCard>
                    <p>Hasta</p>
                    <SmallCard>
                        {tender.dates.inquiriesEnd}
                    </SmallCard>
                </section>
            </section>
            <section className={styles.details_bodyItem}>
                <p>Fecha y hora de la apertura o reveal</p>
                <SmallCard>
                    {tender.dates.reveal}
                </SmallCard>
            </section>
            <section className={styles.details_bodyRow}>
                <section className={styles.details_bodyItem}>
                    <p>Inicio del contrato</p>
                    <SmallCard>
                        A partir del documento contractual
                    </SmallCard>
                </section>
                <section className={styles.details_bodyItem}>
                    <p>Duracion del contrato</p>
                    <SmallCard>
                        {tender.dates.contractDuration}
                    </SmallCard>
                </section>
            </section>
            <Button
                redirectTo={'/tender/' + tender.txid + "/quote"}
                type='main'
                className={styles.details_bodyButton}
            >
                Ofertar <IconPremiumRights />
            </Button>
        </section>
    )
}