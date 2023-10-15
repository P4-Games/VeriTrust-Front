'use client';
import { useEffect, useState } from "react";
import styles from "../../../app/[locale]/profile/Profile.module.scss";
import { Button } from "@/components/Button/Button";
import { IconPlus, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MY_QUOTES, QuoteState } from "@/constants/profile";
import { formatAddress } from "@/utils/format";
import { useAccount, useEnsName } from "wagmi";
import { QuotesTable } from "./Quotes";
import { TendersTable } from "./Tenders";
import { useTranslations } from "next-intl";

export const ProfileBody = ()=>{
    const t = useTranslations("Profile")
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const [isWalletConnected, setIsConnected] = useState<boolean>(true);
    const [quotes, setQuotes] = useState<QuoteState[]>([]);
    const [sectionType, setSectionType] = useState<"offers" | "tenders">("offers"); // My offers or My tenders
    const [description, setDescription] = useState<string>("Wallet not connected");

    useEffect(() => {
        setIsConnected(isConnected);
        if(isConnected){
            setQuotes(MY_QUOTES);
            if(address && address.length > 0) {
                setDescription(ensName ? ensName : formatAddress(address))
            }
        }
    }, [address, ensName, isConnected])

    const toggleSection = ()=> setSectionType(sectionType == "offers" ? "tenders" : "offers");

    return (
        <>
            <section className={styles.profile_header}>
                <h1>{t("defaultTitle")}</h1>
                <p>{t("defaultTaxID")} • <span>{description}</span></p>
            </section>
            <div className={styles.profile_actions}>
                <Button
                    type="main"
                    onClick={() => router.push("/create-tender")}
                >
                    <IconPlus/> {t("action1")}
                </Button>
                <Button
                    type="alt"
                    onClick={() => router.push("/create-profile")}
                >
                    <IconUser /> {t("action2")}
                </Button>
            </div>
            <section 
                className={styles.profile_slider}
                onClick={toggleSection}
            >
                    <div className={sectionType == "offers" ? styles.profile_sliderSelected : styles.profile_sliderDefault}>
                        {t("action3")}
                    </div>
                    <div className={sectionType == "tenders" ? styles.profile_sliderSelected : styles.profile_sliderDefault}>
                        {t("action4")}
                    </div>
            </section>
            {
                sectionType == "offers" ? (
                    <QuotesTable quotes={quotes} />
                ) : (
                    <TendersTable quotes={quotes} />
                )
            }
        </>
    )
}