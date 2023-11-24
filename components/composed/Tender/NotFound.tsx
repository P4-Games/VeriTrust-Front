import React from 'react';
import styles from "../../../app/[locale]/tender/[id]/Tender.module.scss";
import { Button } from '@/components/Button/Button';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const NotFound = () => {
    const t = useTranslations("NotFound");
    return (
        <div className={styles.details}>
            <h3>{t("title")}</h3>
            <p>{t("description")}</p>
            <Button
                redirectTo='/marketplace'
                type='main'
            >
                <IconArrowLeft /> {t("return")}                        
            </Button>
        </div>
    )
}