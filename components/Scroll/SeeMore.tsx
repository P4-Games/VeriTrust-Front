'use client';
import React from "react";
import styles from "../../app/page.module.scss";
import { motion } from "framer-motion";
import { mouse } from "@/assets";

export const SeeMore = ()=>{
    return (
        <>
            <div className={styles.scroll_text}>
                <p>Scroll to see more</p>
                <motion.img 
                    initial={{ y: 0, opacity: 0}}
                    animate={{ y: 10, opacity: 1}}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5}}
                    src={"/mouse.svg"}
                />
            </div>
        </>
    )
}
