'use client';

import React, { useState } from "react";
import styles from "./Select.module.scss";
import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

interface SelectProps{
    options: string[],
    option: string,
    setOption: (option: string) => void;
    className?: string;
}

export const Select = ({ options, setOption, option, className}: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const toggleAccordion = ()=> setIsOpen(!isOpen);

    return (
        <section className={`${styles.select} ${className}`}>
            <div className={styles.select_selected}>
                <div className={styles.select_option}>
                    {option}
                </div>
                <div className={styles.select_arrow} onClick={toggleAccordion}>
                    <IconChevronDown />
                </div>
            </div>
            <AnimatePresence>
                {
                    isOpen ? (
                        <motion.div 
                            className={styles.select_options}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {options.map((option, index) => {
                                const onClick = () => {
                                    setOption(option);
                                    setIsOpen(false);
                                }

                                return (
                                    <div key={index} className={styles.select_option} onClick={onClick}>
                                        {option}
                                    </div>
                                )
                            })}
                        </motion.div>
                    ) : null
                }
            </AnimatePresence>
        </section>
    )
}
