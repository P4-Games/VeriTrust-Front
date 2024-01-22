'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../../app/[locale]/profile/Profile.module.scss";
import { Button } from "@/components/Button/Button";
import { IconExternalLink, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MY_QUOTES, QuoteState } from "@/constants/profile";
import { formatAddress, formatDeadlines } from "@/utils/format";
import { useAccount, useEnsName } from "wagmi";
import { QuotesTable } from "./Quotes";
import { TendersTable } from "./Tenders";
import { useTranslations } from "next-intl";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export const ProfileBody = () => {
    const t = useTranslations("Profile")
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const [quotes, setQuotes] = useState<QuoteState[]>([]);
    const [tenders, setTenders] = useState<QuoteState[]>([]);
    const [sectionType, setSectionType] = useState<"offers" | "tenders">("offers"); // My offers or My tenders
    const [description, setDescription] = useState<string>("Wallet not connected");

    const APIURL = 'https://api.thegraph.com/subgraphs/name/tomasfrancizco/veritrust-protocol-goerli'

    const client = useMemo(() => new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
    }), []); // useMemo will prevent ApolloClient from being recreated on every render

    const fetchTenders = useCallback(async () => {
        if (!address || address.length === 0) return;

        try {
            setDescription(ensName ?? formatAddress(address));

            const queryTendersByUser = `query {
                contractDeployeds(first: 1000, where: {owner: "${address}"}) {
                    contractAddress
                    owner
                    ipfsUrl
                    blockTimestamp
                    transactionHash
                }
            }`;

            const { data } = await client.query({
                query: gql(queryTendersByUser),
            });

            const tenders = data.contractDeployeds.map((tender: any) => {
                const blockTimestamp = tender.blockTimestamp;
                const date = new Date(blockTimestamp * 1000);

                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');

                return {
                    txid: tender.transactionHash,
                    name: tender.ipfsUrl,
                    type: "Public tender",
                    status: "Pending",
                    stage: 1,
                    stageText: [
                        [`${day}/${month}/${date.getFullYear()} - ${hours}:${minutes}`, "https://goerli.etherscan.io/tx/" + tender.transactionHash],
                        ["", ""],
                        ["", ""],
                        ["", ""],
                    ],
                };
            });

            setTenders(tenders);

            const fetchPromises = data.contractDeployeds.map(async (tender: any) => {
                const ipfsUrl = tender.ipfsUrl;
                const response = await fetch("https://gateway.pinata.cloud/ipfs/" + ipfsUrl);
                const ipfsData = await response.json();
                const res = ipfsData;
                res.txid = tender.transactionHash;
                return res;
            });

            const completedTenders = await Promise.all(fetchPromises);

            const tendersWithIPFS = tenders.map((tender: any) => {
                const completedTender = completedTenders.find((completedTender: any) => completedTender.txid === tender.txid);

                if (completedTender) {
                    tender.name = completedTender.name;
                    tender.type = completedTender.type;

                    tender.stageText[1][0] = formatDeadlines(completedTender.dates.commitDeadline);
                    tender.stageText[1][1] = "";

                    tender.stageText[2][0] = formatDeadlines(completedTender.dates.revealDeadline);
                    tender.stageText[2][1] = "";
                }

                return tender;
            });

            setTenders(tendersWithIPFS);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }, [address, client]);

    const fetchBids = useCallback(async () => {
        if (!address || address.length === 0) return;

        try {
            setDescription(ensName ?? formatAddress(address));

            const queryBidsByUser = `query {
                bids(first: 1000, where: {bidder: "${address}"}) {
                    veritrustAddress
                    bidder
                    bidStatus
                    blockTimestamp
                    transactionHash
                }
            }`;

            const { data } = await client.query({
                query: gql(queryBidsByUser),
            });

            console.log(data)

            const tenders = data.bids.map((tender: any) => {
                const blockTimestamp = tender.blockTimestamp;
                const date = new Date(blockTimestamp * 1000);

                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');

                return {
                    txid: tender.transactionHash,
                    name: tender.ipfsUrl,
                    type: "Public tender",
                    status: "Pending",
                    stage: 1,
                    stageText: [
                        [`${day}/${month}/${date.getFullYear()} - ${hours}:${minutes}`, "https://goerli.etherscan.io/address/" + tender.veritrustAddress],
                        ["", ""],
                        ["", ""],
                        ["", ""],
                    ],
                };
            });

            setQuotes(tenders);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }, [address, client]);

    useEffect(() => {
        if (isConnected) {
            //setQuotes(MY_QUOTES);
            fetchTenders();
            fetchBids();
        }
    }, [isConnected, fetchTenders]); // fetchTenders is now a dependency

    const toggleSection = () => setSectionType(sectionType == "offers" ? "tenders" : "offers");

    return (
        <>
            <section className={styles.profile_header}>
                <h1>{t("defaultTitle")}</h1>
                <p className={styles.profile_header_address}><span>{description}</span> <IconExternalLink onClick={() => window.open("https://goerli.etherscan.io/address/" + address)} /></p>
            </section>
            <div className={styles.profile_actions}>
                <button
                    className={styles.profile_slider}
                    onClick={toggleSection}
                >
                    <div className={sectionType == "offers" ? styles.profile_sliderSelected : styles.profile_sliderDefault}>
                        {t("action3")}
                    </div>
                    <div className={sectionType == "tenders" ? styles.profile_sliderSelected : styles.profile_sliderDefault}>
                        {t("action4")}
                    </div>
                </button>
                <Button
                    type="main"
                    onClick={() => router.push("/create-tender")}
                >
                    <IconPlus /> {t("action1")}
                </Button>
            </div>
            {
                sectionType == "offers" ? (
                    <QuotesTable quotes={quotes} />
                ) : (
                    <TendersTable quotes={tenders} />
                )
            }
        </>
    )
}