import React from "react";
import styles from "./Timeline.module.scss";
import Link from "next/link";

interface TimelineProps {
    total: number;
    current: number;
    state: "Pendiente" | "Adjudicado" | "Perdida"; 
    stageText: [string, string][];
    txid: string;
}

export const Timeline = ({ total, current, state, stageText, txid }: TimelineProps)=>{
    const allTexts: string[] = [
        "Publicación",
        "Envío de oferta",
        "Apertura/Reveal",
        "Resultado"
    ]
    const getItemClassName = (item: number): string => {
        let res: string = styles.timeline_item;
        if ((item + 2) > current ) {
            res = styles.timeline_itemDisabled;
        }else{
            if(state == "Adjudicado"){
                res = styles.timeline_itemSuccess;
            }
        }
        
        return res;
    }

    const getCircleClassName = (item: number): string => { 
        let res: string = styles.timeline_circle;
        if(item == total - 1){
            res = styles.timeline_circleActive;
            
            if (state == "Adjudicado") {
                res = styles.timeline_circleActiveSuccess;
            }
        }else{
            if (state == "Adjudicado") {
                res = styles.timeline_circleSuccess;
            }
        }
        return res;
    }

    const getTimelineClassName = (): string => {
        let res = styles.timeline;

        if(state == "Adjudicado"){
            res = styles.timelineSuccess;
        }

        return res;
    }

    return (
        <section className={getTimelineClassName()}>
            {
                [...Array(total - 1)].map((_, index) => {
                    return (
                        <React.Fragment key={index+txid}>
                            <div key={index+txid} className={styles.timeline_itemWrapper}
                                style={{
                                    width: index != total - 2 ? "100%" : "30%"
                                }}
                            >
                                <div className={getCircleClassName(index)}/>
                                {index !== total -1 && <div className={getItemClassName(index)}/>}
                                <p className={styles.timeline_itemText}>
                                    {
                                        allTexts[index] ? (
                                            <b>{allTexts[index]}</b>
                                        ) : null
                                    }
                                    <span>
                                        {stageText.length > 0 && stageText[index][0]} {stageText.length > 0 && stageText[index][1] ? (
                                            <>
                                                {" - "}
                                                <Link href={stageText[index][1]}>
                                                    TX
                                                </Link>
                                            </>
                                        ) : ""}
                                    </span>
                                </p>
                            </div>
                            <div className={getCircleClassName(total - 1)}/>
                        </React.Fragment>
                    )
                })
            }
        </section>
    )
}