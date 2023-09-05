import { Button } from "@/components/Button/Button";
import { QuoteState } from "@/constants/profile";
import { formatAddress, formatTX } from "@/utils/format";
import React, { Dispatch } from "react";

import styles from "../../../app/profile/Profile.module.scss";

import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import { Timeline } from "../Tender/Timeline/Timeline";
import { Input } from "../Tender/Input/Input";
import { AnimatePresence, motion } from "framer-motion";
import { DUMMY_TENDERS_OFFERS } from "@/constants/offers";

interface QuotesTableProps {
  quotes: QuoteState[];
}

export const TendersTable = ({ quotes }: QuotesTableProps) => {
  const [winner, setWinner] = React.useState<string>(""); // Address del oferente
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

  const getFormattedPrice = (price: number): string => {
    let totalPrice = Math.round(price * 1e2) / 1e2;
    return totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                    type={
                      item.status === "Pending winner selection"
                        ? "main"
                        : "card"
                    }
                  >
                    {item.status === "Pending winner selection"
                      ? "Select"
                      : "Details"}
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
                      <h3>
                        {item.status === "Pending winner selection"
                          ? "Select winner:"
                          : "Details:"}
                      </h3>
                      {item.status === "Pending winner selection" ? (
                        <section className={styles.profile_tableWinner}>
                          <div>
                            {DUMMY_TENDERS_OFFERS.map((offer, index) => {
                              return (
                                <section
                                  className={styles.profile_offers}
                                  key={index}
                                >
                                  <div className={styles.profile_offersCompany}>
                                    <div
                                      key={index}
                                      className={styles.profile_checkbox}
                                    >
                                      <div
                                        className={
                                          offer.address === winner
                                            ? styles.profile_checkboxActive
                                            : styles.profile_checkboxDisabled
                                        }
                                        onClick={() => setWinner(offer.address)}
                                      />
                                    </div>
                                    <p>
                                      Oferente: {offer.businessName} -{" "}
                                      <span>
                                        {" "}
                                        {formatAddress(offer.address)}
                                      </span>
                                    </p>
                                  </div>

                                  <p>Address: {offer.businessAddres}</p>
                                  <p>Tax payer ID: {offer.cuit}</p>
                                  <p>
                                    Budget Total: $
                                    {getFormattedPrice(offer.totalPrice)}
                                  </p>
                                </section>
                              );
                            })}
                          </div>
                          <Button type="main" onClick={() => {}}>
                            Select winner
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
            Connect a wallet to view your profile and keep track of your offers or
            tenders
          </p>
        </section>
      ) : null}
    </React.Fragment>
  );
};
