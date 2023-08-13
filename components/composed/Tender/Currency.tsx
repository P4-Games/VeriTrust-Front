'use client';
import styles from "../../../app/tender/[id]/Tender.module.scss";

import { SmallCard } from "@/components/SmallCard/SmallCard";
import { WORLD_CURRENCIES } from "@/constants/worldCurrencies";
import React from "react";
import Flag from "react-world-flags";

export const TenderCurrency = ({currency}: { currency: string }) => {
    return (
        <SmallCard className={styles.flagContainer}>
            <Flag code={WORLD_CURRENCIES.filter(
                (item) => item.currencyCode === currency)[0].countryCode.toLowerCase()
            } className={
                styles.flag
            } />
            {currency}
        </SmallCard>
    );
}