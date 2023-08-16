'use client';

import { TenderItem } from '@/constants/tender';
import styles from './Table.module.scss';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';
import { Input } from './Input/Input';

interface TableItemProps{
    item: TenderItem;
    pricePerUnit?: number;
    setPricePerUnit?: (x: number) => void;
}

export const TableItem = ({ item, pricePerUnit, setPricePerUnit }: TableItemProps) => {
    const [openAccordion, setOpenAccordion] = useState<boolean>(false);

    const toggleAccordion = () => setOpenAccordion(!openAccordion);

    return (
        <>
            <section
                className={`${styles.tableRow} ${styles.extended}`}
            >
                <p>{item.id}</p>
                <p>{item.object}</p>
                <p>{item.code}</p>
                <p>{item.description}</p>
                {
                    setPricePerUnit ? (
                        <Input 
                            type='number'
                            placeholder={'0'}
                            value={pricePerUnit || 0}
                            setValue={setPricePerUnit}
                        />
                    ) : null
                }
                <p>{item.quantity}</p>
                <IconChevronDown className={openAccordion ? styles.arrowActive : styles.arrow } color="#0066FF" onClick={toggleAccordion}/>
            </section>
            <AnimatePresence>
                {openAccordion ? (
                    <motion.section
                        className={styles.table_moreInfo}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <h3>Información adicional</h3>
                        <p>{item.additionalInfo}</p>
                        <h3>Luegar de entrega</h3>
                        <p>{item.deliveryPlace}</p>
                        <h3>Fecha de entrega</h3>
                        <p>{item.deliveryDeadline}</p>
                    </motion.section>
                ) : null}
            </AnimatePresence>
        </>
    );

}
