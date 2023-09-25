import { Tender } from "@/constants/tender";
import styles from "../../../app/tender/[id]/Tender.module.scss";
import React from "react";
import { SmallCard } from "@/components/SmallCard/SmallCard";
import { TenderCurrency } from "./Currency";
import {
  IconFileTypePdf,
  IconPdf,
  IconPremiumRights,
} from "@tabler/icons-react";
import { Button } from "@/components/Button/Button";
import { ItemsTable } from "./ItemsTable";

interface TenderBodyProps {
  tender: Tender;
}
export const TenderBody = ({ tender }: TenderBodyProps) => {
  return (
    <section className={styles.details_body}>
      <section className={styles.details_bodyItem}>
        <p>Currency and scope: </p>
        <section className={styles.details_bodyRow}>
          <TenderCurrency currency={tender.currency} />
          <SmallCard>{tender.scope}</SmallCard>
        </section>
      </section>
      <section className={styles.details_bodyItem}>
        <p>Requires payment: {tender.requires_payment ? "Sí" : "No"} </p>
        <p>
          Extension of time accepted: {tender.allows_extension ? "Sí" : "No"}
        </p>
      </section>
      <p>
        <b>Categories</b>
      </p>
      <section className={styles.details_bodyItem}>
        {tender.categories.map((category, index) => (
          <SmallCard key={index}>{category}</SmallCard>
        ))}
      </section>
      <p>
        <b>Type of quotation</b>
      </p>
      <section className={styles.details_bodyItem}>
        <SmallCard>{tender.quoteType}</SmallCard>
      </section>
      <p>
        <b>Additional Information</b>
      </p>
      <section className={styles.details_bodyItem}>
        {tender.additionalInfo.map((info, index) => (
          <section className={styles.details_bodyItem} key={index}>
            <p>{info[0]}</p>
            <SmallCard key={index}>{info[1]}</SmallCard>
          </section>
        ))}
      </section>
      <p>
        <b>Details of products or services</b>
      </p>
      <ItemsTable items={tender.items} />
      <section className={styles.details_bodyRow}>
        <section className={styles.details_bodyItem}>
          <p>Specifications for terms and conditions</p>
          {
            tender.pliego ? (
              <SmallCard className={styles.flagContainer}>
                <IconFileTypePdf size={24} />
                See specifications
              </SmallCard>
            ) : (
              <SmallCard>Not provided</SmallCard>
            )
          }
        </section>
        <section className={styles.details_bodyItem}>
          <p>Approval provision</p>
          {
            tender.disposicionAprobatoria ? (
              <SmallCard className={styles.flagContainer}>
                <IconFileTypePdf size={24} />
                See provision
              </SmallCard>
            ) : (
              <SmallCard>Not provided</SmallCard>
            )
          }
        </section>
      </section>
      <p>
        <b>Minimum participation requirements</b>
      </p>
      <section className={styles.details_bodyItem}>
        <p>1. Economic and financial requirements</p>
        <SmallCard>{tender.financialRequirements || "Not specified"}</SmallCard>
        <p>2. Technical requirements</p>
        <SmallCard>{tender.technicalRequirements || "Not specified"}</SmallCard>
        <p>3. Administrative requirements</p>
        <SmallCard>{tender.administrativeRequirements || "Not specified"}</SmallCard>
      </section>
      <p>
        <b>Special clauses</b>
      </p>
      <section className={styles.details_bodyItem}>
        <p>Document, Special Number, Linkage Date</p>
        <section className={styles.details_bodyRow}>
          {
            (tender.clause[0] && tender.clause[1]) ? (
              <>
                <SmallCard>{tender.clause}</SmallCard>
                <SmallCard className={styles.flagContainer}>
                  <IconFileTypePdf size={24} />
                  See document
                </SmallCard>
              </>
            ): <SmallCard>No document specified</SmallCard>
          }
        </section>
      </section>
      <section className={styles.details_bodyItem}>
        <p>Guarantees</p>
        <SmallCard>{tender.warranty || "No Guarantees"}</SmallCard>
      </section>
      <section className={styles.details_bodyItem}>
        <p>Penalties</p>
        <SmallCard>
          {(tender.penalties && tender.penalties.length > 0 && tender.penalties[0]) ? (
            <>
              {
                tender.penalties.map((penalty, index) => (
                  <p key={index}>{penalty}</p>
                ))
              }
            </>
          ) : (
            <p>No penalties</p>
          )}
        </SmallCard>
      </section>
      <section className={styles.details_bodyItem}>
        <p>Attachments</p>
        {tender.annexes?.length > 0 ? tender.annexes.map((annexes, index) => (
          <section className={styles.details_bodyRow} key={index}>
            <SmallCard>{annexes[0]}</SmallCard>
            <SmallCard className={styles.flagContainer}>
              <IconFileTypePdf size={24} />
              See attachment
            </SmallCard>
          </section>
        )) : (
          <SmallCard>No attachments</SmallCard>
        )}
      </section>
      <p>
        <b>Additional information</b>
      </p>
      <section className={styles.details_bodyItem}>
        <p>Date and time of inquiries</p>
        <section className={styles.details_bodyRow}>
          <SmallCard>{tender.dates.inquiriesStart || "-"}</SmallCard>
          <p>To</p>
          <SmallCard>{tender.dates.inquiriesEnd || "-"}</SmallCard>
        </section>
      </section>
      <section className={styles.details_bodyItem}>
        <p>Date and time of opening or reveal</p>
        <SmallCard>{tender.dates.reveal || "Not specified"}</SmallCard>
      </section>
      <section className={styles.details_bodyRow}>
        <section className={styles.details_bodyItem}>
          <p>Commencement of contract</p>
          <SmallCard>From the contractual document</SmallCard>
        </section>
        <section className={styles.details_bodyItem}>
          <p>Contract duration</p>
          <SmallCard>{tender.dates.contractDuration || "Not specified"}</SmallCard>
        </section>
      </section>
      <Button
        redirectTo={"/tender/" + tender.txid + "/quote"}
        type="main"
        className={styles.details_bodyButton}
      >
        Bid <IconPremiumRights />
      </Button>
    </section>
  );
};
