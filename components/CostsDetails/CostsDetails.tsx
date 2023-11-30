import React, { useState, useEffect } from "react";
import styles from "./CostsDetails.module.scss";
import { getEthereumPrice } from "@/utils/price";
import { useContractRead } from "wagmi";
import {
  contractABIGoerli,
  veritrustFactoryAddressGoerli,
} from "@/constants/factory";
import { ethers } from "ethers";
import { useTranslations } from "next-intl";

export default function CostsDetails({
  feeTypeToShow,
}: {
  feeTypeToShow: "contract" | "bid";
}) {
  const t = useTranslations("CreateTender");
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [totalCosts, setTotalCosts] = useState<string>("");
  const [fee, setFee] = useState<string | undefined>(undefined);

  let functionToCall = "";
  functionToCall == "bid"
    ? (functionToCall = "bidFee")
    : (functionToCall = "getDeployCost");

  const {
    data: feeData,
    isSuccess,
    isError,
  } = useContractRead({
    address: veritrustFactoryAddressGoerli,
    abi: contractABIGoerli,
    functionName: functionToCall,
  });

  const formatFees = (fee: string | undefined): number =>{
    const value = parseFloat(fee + "");
    return Math.ceil(value * 1e7) / 1e7;
  }

  useEffect(() => {
    if (!isSuccess) return;
    let feeInt: number = 0;
    feeInt = Number(feeData);

    const feeInWei = BigInt(feeInt); // Convert the number to a BigNumber
    const feeInEther = ethers.formatEther(feeInWei); // Use formatEther with the BigNumber
    setFee(feeInEther);

    let costs: number = 0;
    costs += 0.0008 * ethPrice; // network fees
    costs += (Number(feeInt) / 10 ** 18) * ethPrice; // stamping or bid fee
    const costsStr = costs.toFixed(2);
    setTotalCosts(costsStr);
  }, [ethPrice, feeTypeToShow, isSuccess]);

  useEffect(() => {
    getEthereumPrice().then((price) => {
      setEthPrice(price);
    });
  }, []);

  return (
    <section className={styles.details_finalDetails}>
      <h4>{t("finalDetailsTitle")}</h4>
      <div>
        <h4>{t("finalDetailsConcept")}</h4>
        <p>
          {feeTypeToShow === "contract"
            ? `${t("finalDetailsConcept1")} ${formatFees(fee)} ETH `
            : `${t("finalDetailsConcept2")} ${formatFees(fee)} ETH `}
        </p>
        {/* <p>Network fees: 0.0008 ??? ETH</p> */}
      </div>
      <h4>{t("finalDetailsTotal")} {totalCosts} USD</h4>
    </section>
  );
}
