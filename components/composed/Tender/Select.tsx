'use client';

import React from "react";
import styles from "./Select.module.scss";
import { IconChevronDown } from "@tabler/icons-react";

interface SelectProps{
    options: string[],
    option: string,
    setOption: (option: string) => void;
    className?: string;
}

export const Select = ({ options, setOption, option, className}: SelectProps) => {
    return (
        <section className={`${styles.select} ${className}`}>
            <div>
                <div className={styles.select_option}>
                    {option}
                </div>
                <div className={styles.select_arrow}>
                    <IconChevronDown />
                </div>
            </div>
            {options.map((option, index) => {
                const onClick = () => {
                    setOption(option);
                }

                return (
                    <div key={index} className={styles.select_option} onClick={onClick}>
                        {option}
                    </div>
                )
            })}
        </section>
    )
}
