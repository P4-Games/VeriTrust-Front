import Link from 'next/link';
import React from 'react';
import styles from "./Breadcrumb.module.scss";

interface BreadcrumbProps{
    values: [string, string][];
}
export const Breadcrumb = ({ values }: BreadcrumbProps) => {
    return (
        <div className={styles.breadcrumb}>
            {values.map((value, index) => {
                return (
                    <>
                        <Link 
                            key={index}
                            href={value[1]}
                            className={styles.breadcrumb_link}
                        >
                            {value[0]}
                        </Link>
                        {index < values.length - 1 && <span className={styles.breadcrumb_separator}>{"/"}</span>}
                    </>
                );
            })}
        </div>
    );
}
