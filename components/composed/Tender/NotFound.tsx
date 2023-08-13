import React from 'react';
import styles from "../../../app/tender/[id]/Tender.module.scss";
import { Button } from '@/components/Button/Button';
import { IconArrowLeft } from '@tabler/icons-react';

export const NotFound = () => {
    return (
        <div className={styles.details}>
            <h3>No se encontró la licitacion</h3>
            <p>Presione el siguiente botón para volver al marketplace</p>
            <Button
                redirectTo='/marketplace'
                type='main'
            >
                <IconArrowLeft /> Volver                        
            </Button>
        </div>
    )
}