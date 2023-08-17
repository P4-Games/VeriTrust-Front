'use client';
import React from "react";

import styles from "./Button.module.scss";
import Link from "next/link";

interface ButtonProps{
    type?: "main" | "alt" | "link" | "card";
    className?: string;
    children: React.ReactNode;
    redirectTo?: string; //Next router path
    onClick?: ()=>void; //other click event
    disabled?: boolean;
}

export const Button = ({ type = "main", className = "", children, disabled = false, redirectTo = "", onClick }: ButtonProps): JSX.Element => {

    const TYPES: Record<string, string> = {
        main: styles.button_main,
        alt: styles.button_alt,
        link: styles.button_link,
        card: styles.button_card
    }

    const handleClick = () => {
        if(disabled) return;
        if(redirectTo) return;
        if(onClick) onClick(); 
    }

    return (
        <>
            {
                redirectTo ? (
                    <Link 
                        href={redirectTo}
                        className={`${styles.button} ${TYPES[type]} ${className}`}
                    >
                        {children}
                    </Link>
                ) : (
                    <button disabled={disabled} className={`${styles.button} ${TYPES[type]} ${className}`} onClick={handleClick}>
                        {children}
                    </button>
                )
            }
        </>
    )
}