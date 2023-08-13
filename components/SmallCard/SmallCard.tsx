import React from "react";
import styles from "./SmallCard.module.scss";

interface SmallCardProps {
    children: React.ReactNode;
    className?: string;
}

export const SmallCard = ({ children, className = "" }: SmallCardProps ) => {
    return (
        <div className={`${styles.smallCard} ${className}`}>
            {children}
        </div>
    )
}