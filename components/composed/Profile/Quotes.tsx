import { Button } from "@/components/Button/Button";
import { QuoteState } from "@/constants/profile";
import { formatTX } from "@/utils/format";
import React, { Dispatch } from "react";

import styles from "../../../app/profile/Profile.module.scss";

import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import { Timeline } from "../Tender/Timeline/Timeline";
import { Input } from "../Tender/Input/Input";
import { AnimatePresence, motion } from "framer-motion";

interface QuotesTableProps {
  quotes: QuoteState[];
}

export const QuotesTable = ({ quotes }: QuotesTableProps) => {
  const [urls, setUrls] = React.useState<Map<string, string>>(
    new Map<string, string>()
  );
  const [openAccordion, closeAccordion] = React.useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  const toggleIndividualAccordion = (txid: string) => {
    const newAccordion = new Map(openAccordion);
    //Check if the given txid exists, if not set as true
    if (!newAccordion.has(txid)) {
      newAccordion.set(txid, true);
    } else {
      newAccordion.set(txid, !newAccordion.get(txid));
    }

    closeAccordion(newAccordion);
  };

  const getIndividualAccordion = (txid: string) => {
    return openAccordion.get(txid) || false;
  };

  const setIndividualUrl = (txid: string, url: string) => {
    const newUrls = new Map(urls);
    newUrls.set(txid, url);
    setUrls(newUrls);
  };

  return (
    <React.Fragment>
      <section className={styles.profile_table}>
        <section className={styles.profile_tableHead}>
          <h3>TX Process</h3>
          <h3>Name</h3>
          <h3>Type</h3>
          <h3>Status</h3>
        </section>
        <section className={styles.profile_tableBody}>
          {quotes.map((item: QuoteState, index) => {
            return (
              <>
                <div className={styles.profile_tableRow} key={index}>
                  <p className={styles.profile_tableRowTX}>
                    {formatTX(item.txid)}
                  </p>
                  <p className={styles.profile_tableRowTitle}>{item.name}</p>
                  <p>{item.type}</p>
                  <p>{item.status}</p>
                  <Button
                    onClick={() => toggleIndividualAccordion(item.txid)}
                    type={item.status == "Pending reveal" ? "main" : "card"}
                  >
                    {item.status == "Pending reveal"
                      ? "Reveal"
                      : "More details"}{" "}
                    <IconChevronDown />
                  </Button>
                </div>
                <AnimatePresence>
                  {getIndividualAccordion(item.txid) ? (
                    <motion.div
                      className={styles.profile_tenderDetails}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <h3>Detalles: </h3>
                      {item.status == "Pending reveal" ? (
                        <section className={styles.profile_tableRowReveal}>
                          <div className={styles.profile_tableRowRevealInput}>
                            Enviar tu URL para revelar la oferta
                            <Input
                              setValue={(url: string) =>
                                setIndividualUrl(item.txid, url)
                              }
                              value={urls.get(item.txid) || ""}
                              placeholder="URL"
                            />
                          </div>
                          <Button
                            type="main"
                            onClick={() => {
                              console.log(
                                "reveal",
                                item.txid,
                                urls.get(item.txid)
                              );
                            }}
                          >
                            Revelar
                          </Button>
                        </section>
                      ) : null}
                      <section className={styles.profile_tableRowTimeline}>
                        <Timeline
                          current={item.stage}
                          status={item.status}
                          total={4}
                          stageText={item.stageText}
                          txid={item.txid}
                        />
                      </section>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </>
            );
          })}
        </section>
      </section>
      {quotes && quotes.length === 0 ? (
        <section className={styles.profile_header}>
          <p>
            Connect a wallet to view your profile and keep track of your offers
            or tenders
          </p>
        </section>
      ) : null}
    </React.Fragment>
  );
};
