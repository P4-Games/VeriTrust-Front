"use client";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import styles from "../Tender.module.scss";

import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Tender } from "@/constants/tender";
import { getTender } from "@/utils/tender";
import { Button } from "@/components/Button/Button";
import {
  IconArrowLeft,
  IconFileUpload,
  IconPremiumRights,
  IconWorld,
} from "@tabler/icons-react";
import { NotFound } from "@/components/composed/Tender/NotFound";
import { TenderBody } from "@/components/composed/Tender/TenderBody";
import { Select } from "@/components/composed/Tender/Select/Select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/composed/Tender/Input/Input";
import { ItemsTable } from "@/components/composed/Tender/ItemsTable";
import { getEthereumPrice } from "@/utils/price";
import CostsDetails from "@/components/CostsDetails/CostsDetails";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer/Footer";
import { useContractWrite, useContractRead } from "wagmi";
import { contractVeritrustABIGoerli } from "@/constants/contracts/index";
import { ipfsGet, ipfsUploadJson } from "@/utils/ipfsServices";

export default function Page({ params }: { params: { id: string } }) {
  const t = useTranslations("Bid");
  const [postData, setPostData] = useState<Tender>({} as Tender);
  const [option, setOption] = useState<string>("Corporation");
  const [razonSocial, setRazonSocial] = useState<string>("");
  const [cuit, setCuit] = useState<string>("");
  const [domicilio, setDomicilio] = useState<string>("");
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [router, setRouter] = useState<any>(null);
  const [allQuotes, setAllQuotes] = useState<number[]>([]); // allQuotes[id] = price per unit
  const [bidCost, setBidCost] = useState<bigint>();

  const { data: contractBidCost } = useContractRead({
    // address: veritrustAddressGoerli,
    abi: contractVeritrustABIGoerli,
    functionName: "getBidCost",
  });

  useEffect(() => {
    setBidCost(contractBidCost as bigint);
  }, [bidCost, contractBidCost]);

  useEffect(() => {
    getTender(params.id).then((data) => {
      setPostData(data);
      let newQuotes: number[] = [];
      data.items.forEach((item) => {
        newQuotes[item.id] = 0;
      });
      setAllQuotes(newQuotes);
    });
  }, [params.id]);

  useEffect(() => {
    setRouter(useRouter);
    getEthereumPrice().then((price) => {
      setEthPrice(price);
    });
  }, []);

  const {
    isLoading,
    write: deployContract,
    isError,
  } = useContractWrite({
    // address: veritrustAddressGoerli,
    abi: contractVeritrustABIGoerli,
    functionName: "setBid",
    value: bidCost,
  });

  const handleBid = async () => {
    // const { isOk, data: ipfsHash } = await ipfsUploadJson(formState);

    // ipfshash needs to be encrypted before sending it to the contract
    // if (isOk) {
    //   deployContract({
    //     args: [
    //       bidderName // business name
    //       ipfsHash, // bytes32 url encrypted hash of the ipfs hash
    //     ],
    //   });
    // }

    // const ipfsRes = await ipfsGet(data as string);
    // console.log(ipfsRes.data)

    console.log();
  };

  return (
    <>
      <Navbar />
      {postData?.name?.length > 1 ? (
        <section className={styles.details}>
          {/* <Breadcrumb
            values={[
              [t("route1"), "/marketplace"],
              [t("route2"), "/tender/" + params?.id],
              [t("route3"), "/tender/" + params?.id + "/quote"],
            ]}
          /> */}
          <div className={styles.details_back} onClick={() => router.back()}>
            <IconArrowLeft className={styles.details_backIcon} />
            <h4>{t("return")}</h4>
          </div>
          <section className={styles.details_head}>
            <h1 className={styles.details_headTitle}>{postData?.name}</h1>
            <p>
              {t("deadline")} {postData.dates?.reveal}{" "}
            </p>
          </section>
          <section className={styles.details_body}>
            <h3 className={styles.details_bodyLabel}>{t("supplier")}</h3>
            <Select
              options={[
                "Persona Humana",
                "Sociedades de hecho",
                "Cooperativas",
                "Unión Transitoria de Empresas",
                "Talleres Protegidos de Producción",
                "Sociedades Anónimas",
                "Sociedad Responsabilidad Limitada",
                "Otras Formas Societarias (Ej: Colectiva, en Com. Simp., S.C.A., de Cap. e Ind.).",
                "Organismo Público",
                "Persona humana extranjera no residente en el país",
                "Persona jurídica extranjera sin sucursal en el país",
              ]}
              option={option}
              setOption={setOption}
            />
            <Input
              value={razonSocial}
              setValue={setRazonSocial}
              label={t("company")}
              placeholder={t("company_placeholder")}
            />
            <Input
              value={cuit}
              setValue={setCuit}
              label={t("taxid")}
              placeholder={t("taxid_placeholder")}
            />
            <Input
              value={domicilio}
              setValue={setDomicilio}
              label={t("address")}
              placeholder={t("address_placeholder")}
            />
            <ItemsTable
              items={postData.items}
              allQuotes={allQuotes}
              setAllQuotes={setAllQuotes}
            />
            <section className={styles.details_warranties}>
              <h3 className={styles.details_warrantiesTitle}>
                {t("warranties")}
              </h3>
              <p>{t("warrantiesDefault")}</p>
            </section>
            <CostsDetails feeTypeToShow="bid" />
            <Button type="main" onClick={handleBid}>
              {t("action")} <IconFileUpload />
            </Button>
          </section>
        </section>
      ) : (
        <NotFound />
      )}
      <Footer />
    </>
  );
}
