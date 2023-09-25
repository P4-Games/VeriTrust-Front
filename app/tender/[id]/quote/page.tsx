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

export default function Page({ params }: { params: { id: string } }) {
  const [postData, setPostData] = useState<Tender>({} as Tender);
  const [option, setOption] = useState<string>("Corporation");
  const [razonSocial, setRazonSocial] = useState<string>("");
  const [cuit, setCuit] = useState<string>("");
  const [domicilio, setDomicilio] = useState<string>("");
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [router, setRouter] = useState<any>(null);

  const [allQuotes, setAllQuotes] = useState<number[]>([]); // allQuotes[id] = price per unit

  const getFormattedPrice = (): string => {
    let totalPrice: number = postData.items.reduce((total, item) => {
      return total + item.quantity * allQuotes[item.id];
    }, 0);

    totalPrice = Math.round(totalPrice * 1e2) / 1e2;
    return totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const estimateCosts = () => {
    let totalCosts: number = 0;
    totalCosts += 0.0006 * ethPrice; // fees de red
    totalCosts += 50; // ethPrice; // timbrados
    return totalCosts;
  };

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

  return (
    <>
      <Navbar />
      {postData?.name?.length > 1 ? (
        <section className={styles.details}>
          <Breadcrumb
            values={[
              ["Tenders", "/marketplace"],
              ["Tender details", "/tender/" + params?.id],
              ["Bid", "/tender/" + params?.id + "/quote"],
            ]}
          />
          <div className={styles.details_back} onClick={() => router.back()}>
            <IconArrowLeft className={styles.details_backIcon} />
            <h4>Return</h4>
          </div>
          <section className={styles.details_head}>
            <h1 className={styles.details_headTitle}>{postData?.name}</h1>
            <p>Deadline: {postData.dates.reveal} </p>
          </section>
          <section className={styles.details_body}>
            <h3 className={styles.details_bodyLabel}>Supplier type:</h3>
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
              label="Company name"
              placeholder="Example Corp"
            />
            <Input
              value={cuit}
              setValue={setCuit}
              label="Tax ID number"
              placeholder="30-12345678-5"
            />
            <Input
              value={domicilio}
              setValue={setDomicilio}
              label="Address (street and number, zip code, city, county, province, country)"
              placeholder="Example 1234, B7600 - Mar del Plata, Gral. Pueyrredón, Buenos Aires, Argentina"
            />
            <ItemsTable
              items={postData.items}
              allQuotes={allQuotes}
              setAllQuotes={setAllQuotes}
            />
            <section className={styles.details_warranties}>
              <h3 className={styles.details_warrantiesTitle}>Guarantees</h3>
              <p>Not required</p>
            </section>
            {/* <section className={styles.details_finalDetails}>
              <h3>Details</h3>
              <p>
                Total bid price: $ {getFormattedPrice()} {postData.currency}
              </p>
              <h3>Additional costs:</h3>
              <p>
                Stamping: $50 USD <br />
                Network fees: 0.0006 ETH
              </p>
              <h3>Estimated total: $ {estimateCosts()} USDC</h3>
            </section> */}
            <CostsDetails feeTypeToShow="bid" />
            <Button type="main" onClick={() => {}}>
              Place bid <IconFileUpload />
            </Button>
          </section>
        </section>
      ) : (
        <NotFound />
      )}
    </>
  );
}
