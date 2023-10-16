import { Tender } from "@/constants/tender";
import styles from "../../../app/[locale]/tender/[id]/Tender.module.scss";
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
import { useTranslations } from "next-intl";

interface TenderBodyProps {
  tender: Tender;
}
export const TenderBody = ({ tender }: TenderBodyProps) => {
  const t = useTranslations("Details");
  
  return (
    <section className={styles.details_body}>
      <section className={styles.details_bodyItem}>
        <p>{t("subheading")}</p>
        <section className={styles.details_bodyRow}>
          <TenderCurrency currency={tender.currency} />
          <SmallCard>{tender.scope}</SmallCard>
        </section>
      </section>
      <section className={styles.details_bodyItem}>
        <p>{t("i2")} {tender.requires_payment ? t("yes") : t("no")} </p>
        <p>
          {t("i3")} {tender.allows_extension ? t("yes") : t("no")}
        </p>
      </section>
      <p>
        <b>{t("i4")}</b>
      </p>
      <section className={styles.details_bodyItem}>
        {tender.categories.map((category, index) => (
          <SmallCard key={index}>{category}</SmallCard>
        ))}
      </section>
      <p>
        <b>{t("i5")}</b>
      </p>
      <section className={styles.details_bodyItem}>
        <SmallCard>{tender.quoteType}</SmallCard>
      </section>
      <p>
        <b>{t("i6")}</b>
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
        <b>{t("i7")}</b>
      </p>
      <ItemsTable items={tender.items} />
      <section className={styles.details_bodyRow}>
        <section className={styles.details_bodyItem}>
          <p>{t("i10")}</p>
          {
            tender.pliego ? (
              <SmallCard className={styles.flagContainer}>
                <IconFileTypePdf size={24} />
              </SmallCard>
            ) : (
              <SmallCard>{t("i11")}</SmallCard>
            )
          }
        </section>
        <section className={styles.details_bodyItem}>
          <p>{t("i9")}</p>
          {
            tender.disposicionAprobatoria ? (
              <SmallCard className={styles.flagContainer}>
                <IconFileTypePdf size={24} />
                {t("i12")}
              </SmallCard>
            ) : (
              <SmallCard>{t("NotProvided")}</SmallCard>
            )
          }
        </section>
      </section>
      <p>
        <b>{t("i12")}</b>
      </p>
      <section className={styles.details_bodyItem}>
        <p>{t("i13")}</p>
        <SmallCard>{tender.financialRequirements || "Not specified"}</SmallCard>
        <p>{t("i14")}</p>
        <SmallCard>{tender.technicalRequirements || "Not specified"}</SmallCard>
        <p>{t("i15")}</p>
        <SmallCard>{tender.administrativeRequirements || "Not specified"}</SmallCard>
      </section>
      <p>
        <b>{t("i16")}</b>
      </p>
      <section className={styles.details_bodyItem}>
        <p>{t('i17')}</p>
        <section className={styles.details_bodyRow}>
          {
            (tender.clause[0] && tender.clause[1]) ? (
              <>
                <SmallCard>{tender.clause}</SmallCard>
                <SmallCard className={styles.flagContainer}>
                  <IconFileTypePdf size={24} />
                  {t("i18")}
                </SmallCard>
              </>
            ): <SmallCard>{t("i18-2")}</SmallCard>
          }
        </section>
      </section>
      <section className={styles.details_bodyItem}>
        <p>{t("i19")}</p>
        <SmallCard>{tender.warranty || t("i19-2")}</SmallCard>
      </section>
      <section className={styles.details_bodyItem}>
        <p>{t("i20")}</p>
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
            <p>{t("i20-2")}</p>
          )}
        </SmallCard>
      </section>
      <section className={styles.details_bodyItem}>
        <p>{t("i21")}</p>
        {tender.annexes?.length > 0 ? tender.annexes.map((annexes, index) => (
          <section className={styles.details_bodyRow} key={index}>
            <SmallCard>{annexes[0]}</SmallCard>
            <SmallCard className={styles.flagContainer}>
              <IconFileTypePdf size={24} />
              {t("i22")}
            </SmallCard>
          </section>
        )) : (
          <SmallCard>{t("i22-2")}</SmallCard>
        )}
      </section>
      <p>
        <b>{t("i23")}</b>
      </p>
      <section className={styles.details_bodyItem}>
        <p>{t("i24")}</p>
        <section className={styles.details_bodyRow}>
          <SmallCard>{tender.dates.inquiriesStart || "-"}</SmallCard>
          <p>{t("i25")}</p>
          <SmallCard>{tender.dates.inquiriesEnd || "-"}</SmallCard>
        </section>
      </section>
      <section className={styles.details_bodyItem}>
        <p>{t("i26")}</p>
        <SmallCard>{tender.dates.reveal || t("NotProvided")}</SmallCard>
      </section>
      <section className={styles.details_bodyRow}>
        <section className={styles.details_bodyItem}>
          <p>{t("i27")}</p>
          <SmallCard>{t("i28")}</SmallCard>
        </section>
        <section className={styles.details_bodyItem}>
          <p>{t("i29")}</p>
          <SmallCard>{tender.dates.contractDuration || t("NotProvided")}</SmallCard>
        </section>
      </section>
      <Button
        redirectTo={"/tender/" + tender.txid + "/quote"}
        type="main"
        className={styles.details_bodyButton}
      >
        {t("i30")} <IconPremiumRights />
      </Button>
    </section>
  );
};
