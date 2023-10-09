import React from 'react';
import styles from "../../../app/[locale]/tender/[id]/Tender.module.scss";
import { Button } from '@/components/Button/Button';
import { IconArrowLeft } from '@tabler/icons-react';

export const NotFound = () => {
    return (
        <div className={styles.details}>
            <h3>Tender not found</h3>
            <p>Click on the following button to return to the marketplace</p>
            <Button
                redirectTo='/marketplace'
                type='main'
            >
                <IconArrowLeft /> Return                        
            </Button>
        </div>
    )
}