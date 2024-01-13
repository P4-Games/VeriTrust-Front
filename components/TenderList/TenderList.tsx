//Client component that displays all the tenders, and it's responsible for fetching or retrieving the TXs
"use client";
import styles from "@/app/[locale]/marketplace/Marketplace.module.scss";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { formatTX } from "@/utils/format";
import { IconExternalLink } from "@tabler/icons-react";
import {
  EXPLORER_URL,
  TransactionDetails,
  listTransactions,
} from "@/utils/marketplace";
import { useTranslations } from "next-intl";
import { useQuery, gql } from "@urql/next";
import { ipfsGet } from "@/utils/ipfsServices";
import { Tender } from "@/constants/tender";

type ContractDeployed = {
  contractAddress: string;
  ipfsUrl: string;
  owner: string;
  __typename: string;
};

const queryTenders = gql`
  query {
    contractDeployeds(first: 1000) {
      contractAddress
      owner
      ipfsUrl
    }
  }
`;

export default function TenderList() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [result] = useQuery({ query: queryTenders });
  const t = useTranslations("Marketplace");

  useEffect(() => {
    setParsedTenders();
  }, []);

  const handleTXClick = (tx: string) => {
    window.open(EXPLORER_URL + tx);
  };

  const setParsedTenders = async () => {
    const allDataPromises = result.data.contractDeployeds.map(
      (contractDeployed: ContractDeployed) => ipfsGet(contractDeployed.ipfsUrl)
    );
    const allData = await Promise.all(allDataPromises);
    const parsedData: Tender[] = allData.map((data) => data.data);
    setTenders(parsedData);
    setLoading(false);
  };

  function formatDateString(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}hs`;
  }

  return (
    <section className={styles.marketplace_list}>
      <div className={styles.marketplace_listHeader}>
        <h3>{t("tableheading1")}</h3>
        <h3>{t("tableheading2")}</h3>
        <h3>{t("tableheading3")}</h3>
        <h3>{t("tableheading4")}</h3>
      </div>
      {tenders?.map((tender, index) => (
        <div className={styles.marketplace_listItem} key={index}>
          <button
            className={styles.marketplace_listItemTX}
            onClick={() => handleTXClick(tender.txid)}
          >
            {formatTX(tender.txid)}
          </button>
          <p className={styles.marketplace_listItemTitle}>{tender.name}</p>
          <p>
            {tender.type}
            {/* {t("tableitem1")} */}
          </p>
          <p>{formatDateString(tender.dates.commitDeadline)}</p>
          <Button
            redirectTo={`/tender/${tender.hash}`}
            className={styles.marketplace_listItemButton}
          >
            {t("tableButton")} <IconExternalLink />
          </Button>
        </div>
      ))}
      {loading ? (
        <>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div className={styles.marketplace_listItemSkeleton} key={index}>
                <Skeleton width="80%" height="40px" />
                <Skeleton width="80%" height="40px" />
                <Skeleton width="80%" height="40px" />
                <Skeleton width="80%" height="40px" />
              </div>
            ))}
        </>
      ) : null}
    </section>
  );
}
