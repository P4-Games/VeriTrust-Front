"use client";
import React, { useState, FormEvent, useEffect } from "react";
import styles from "./CreateTenderForm.module.scss";
import { Button } from "@/components/Button/Button";
import { IconPlus, IconX, IconChevronDown } from "@tabler/icons-react";
import InputForm from "@/components/InputForm/InputForm";
import SwitchForm from "@/components/SwitchForm/SwitchForm";
import DynamicInputForm from "@/components/composed/DynamicInputForm/DynamicInputForm";
import DynamicFormModal from "@/components/composed/DynamicFormModal/DynamicFormModal";
import Overlay from "@/components/Overlay/Overlay";
import { Tender, TenderItem } from "@/constants/tender";
import { AnimatePresence, motion } from "framer-motion";
import {
  contractABIGoerli,
  veritrustFactoryAddressGoerli,
} from "@/constants/factory";
import { useContractWrite, useContractRead } from "wagmi";
import CostsDetails from "@/components/CostsDetails/CostsDetails";
import { ipfsGet, ipfsUploadJson } from "@/utils/ipfsServices";
import InputFileForm from "@/components/InputFileForm/InputFileForm";
import { useTranslations } from "next-intl";

const DATE_NOW_ISO = new Date().toISOString().slice(0, 16);

export const CreateTenderForm = () => {
  const tDetails = useTranslations("Details");
  const t = useTranslations("CreateTender");

  const [formState, setFormState] = useState<Tender>({
    txid: "",
    name: "",
    type: "Public tender",
    opening_date: "",
    currency: "",
    scope: "Argentina",
    requires_payment: false,
    allows_extension: false,
    categories: [""],
    quoteType: "All items",
    additionalInfo: [], //Title and value of the custom input
    items: [],
    specifications: "", //IPFS Hash (PDF) - Pliego
    approvingProvision: "", //IPFS Hash (PDF)
    financialRequirements: "",
    technicalRequirements: "",
    administrativeRequirements: "",
    clause: ["", ""], //Documento, Numero GDE, Numero especial, Fecha vinculación -> [datos, IPFS Hash (PDF)]
    warranty: "",
    penalties: [""],
    annexes: [], //Title and IPFS Hash (PDF) of the annexes (array of tuples)
    dates: {
      inquiriesStart: "",
      inquiriesEnd: "",
      commitDeadline: "",
      revealDeadline: "",
      contractStart: "", // It should be "A partir del documento contractual"
      contractDuration: "", // E.g. "3 months"
    },
  });

  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showTableRow, setShowTableRow] = useState(-1);

  const [_commitDeadline, setCommitDeadline] = useState<number>(
    new Date().getTime()
  );
  const [_revealDeadline, setRevealDeadline] = useState<number>(
    new Date().getTime()
  );

  const [warrantyAmount, setWarrantyAmount] = useState<bigint>();

  const { data: deployFeeData } = useContractRead({
    address: veritrustFactoryAddressGoerli,
    abi: contractABIGoerli,
    functionName: "getDeployCost",
  });

  useEffect(() => {
    setWarrantyAmount(deployFeeData as bigint);
  }, [deployFeeData]);

  const handleChange = async (
    name: string,
    inputValue: string,
    index?: number
  ) => {
    console.log('change')
    if (index !== undefined) {
      let auxArray = [...formState[name]];
      auxArray[index] = inputValue;
      setFormState({
        ...formState,
        [name]: auxArray,
      });
    } else {
      setFormState({
        ...formState,
        [name]: inputValue,
      });
    }
  };

  const handleDatesChange = (name: string, inputValue: any) => {
    setFormState({
      ...formState,
      dates: {
        ...formState.dates,
        [name]: inputValue,
      },
    });

    // date.time en segundos a partir de la fecha actual
    const date = Math.round(
      (new Date(inputValue).getTime() - new Date().getTime()) / 1000
    );

    // reveal deadline se cuenta a partir del commit deadline
    if (name == "commitDeadline") {
      setCommitDeadline(date);
    } else if (name == "revealDeadline") {
      setRevealDeadline(date);
    }
  };

  const handleDynamicInputChange = (name: string, dynamicInputs: string[]) => {
    setFormState({
      ...formState,
      [name]: dynamicInputs,
    });
  };

  const handleDynamicFormSubmit = (formData: TenderItem) => {
    formData.id = formState.items.length + 1;
    setFormState({
      ...formState,
      items: [...formState.items, formData],
    });
  };

  const handleDeleteRow = (index: number) => {
    const updatedItems = formState.items;
    updatedItems.splice(index, 1);
    setFormState({ ...formState, items: updatedItems });
  };

  const handleShowMore = (index: number) => {
    if (showTableRow === index) {
      setShowTableRow(-1);
    } else {
      setShowTableRow(index);
    }
  };

  const { isLoading, write: deployContract } = useContractWrite({
    address: veritrustFactoryAddressGoerli,
    abi: contractABIGoerli,
    functionName: "deployVeritrust",
    value: warrantyAmount,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isOk, data: ipfsFormHash } = await ipfsUploadJson(formState);

    if (isOk) {
      setIpfsHash(ipfsFormHash);
      deployContract({
        args: [
          formState.name,
          ipfsFormHash,
          _commitDeadline,
          _revealDeadline,
          warrantyAmount,
        ],
      });
      console.log([
        formState.name,
        ipfsFormHash, // ipfs hash
        _commitDeadline,
        _revealDeadline,
        warrantyAmount,
      ]);
    }

    // const ipfsRes = await ipfsGet(data as string);
    // console.log(ipfsRes.data)

    console.log(formState);
  };

  // useEffect(() => {
  //   // if (ipfsHash !== "") {
  //   //   deployContract();
  //   // }
  //   console.log([
  //     formState.name,
  //     ipfsHash,
  //     _commitDeadline,
  //     _revealDeadline,
  //     warrantyAmount,
  //   ]);
  // }, [ipfsHash]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <InputForm
          value={formState.name}
          handleChange={handleChange}
          type="text"
          name="name"
          label={t("i0") + ":"}
          placeholder={t("i0_placeholder")}
          required
        />
        <div className={styles.form_input}>
          <InputForm
            value={formState.currency}
            handleChange={handleChange}
            type="text"
            name="currency"
            label={tDetails("i1")}
            placeholder="USD, Argentina"
          />
        </div>
        <div className={styles.form_compound}>
          <SwitchForm
            name="requires_payment"
            checked={formState.requires_payment}
            handleChange={handleChange}
            label={tDetails("i2")}
          />
          <SwitchForm
            name="allows_extension"
            checked={formState.allows_extension}
            handleChange={handleChange}
            label={tDetails("i3")}
          />
        </div>
        <div className={styles.form_input}>
          <DynamicInputForm
            dynamicInputs={formState.categories}
            onDynamicInputChange={handleDynamicInputChange}
            type="text"
            name="categories"
            label={tDetails("i4")}
            placeholder={t("categoriesPlaceholder")}
          />
        </div>
        {/* <div className={styles.form_input}>
            <InputForm
              value={formState.quoteType}
              handleChange={handleChange}
              type="text"
              name="quoteType"
              label="Tipo de cotización"
              placeholder="Solo cotizacion por todos los items"
            />
          </div> */}
        <div className={styles.form_input}>
          <h4>{tDetails("i7")}</h4>
          <div className={styles.table_list}>
            <div className={styles.table_listHeader}>
              <h5>{t("productsHeading1")}</h5>
              <h5>{t("productsHeading2")}</h5>
              <h5>{t("productsHeading3")}</h5>
              <h5>{t("productsHeading4")}</h5>
              <h5>{t("productsHeading5")}</h5>
            </div>
            <div className={styles.line}></div>
            {formState.items.map((item, index) => (
              <div className={styles.table_listRow} key={index}>
                <p>{item.id}</p>
                <p>{item.object}</p>
                <p>{item.code}</p>
                <p className={styles.description}>{item.description}</p>
                <p>{item.quantity}</p>
                <button
                  type="button"
                  onClick={() => handleShowMore(index)}
                  className={styles.table_listRowBtn}
                >
                  <IconChevronDown />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteRow(index)}
                  className={styles.table_listRowBtn}
                >
                  <IconX />
                </button>
                {showTableRow === index && (
                  <AnimatePresence>
                    <div className={styles.expanded_row}>
                      <motion.section
                        className={styles.table_moreInfo}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <h3>{t("productDetail1")}</h3>
                        <p>{item.additionalInfo}</p>
                        <h3>{t("productDetail2")}</h3>
                        <p>{item.deliveryPlace}</p>
                        <h3>{t("productDetail3")}</h3>
                        <p>{item.deliveryDeadline}</p>
                      </motion.section>
                    </div>
                  </AnimatePresence>
                )}
                <div className={styles.line}></div>
              </div>
            ))}
          </div>
          {/* <div className={styles.btns_container}> */}
          <button
            onClick={() => setShowFormModal(true)}
            type="button"
            className={styles.table_button}
          >
            <IconPlus /> {t("productsAction1")}
          </button>
        </div>
        <div className={styles.form_compound}>
          <InputFileForm
            // hash={formState.specifications}
            handleChange={handleChange}
            name="specifications"
            label={tDetails("i8")}
          />
          <InputFileForm
            // hash={formState.approvingProvision}
            handleChange={handleChange}
            name="approvingProvision"
            label={tDetails("i10")}
          />
        </div>
        <div className={styles.form_input}>
          <h4>{tDetails("i12")}</h4>
          <InputForm
            value={formState.financialRequirements}
            handleChange={handleChange}
            name="financialRequirements"
            label={tDetails("i13")}
            placeholder={t("i13_placeholder")}
          />
          <InputForm
            value={formState.technicalRequirements}
            handleChange={handleChange}
            name="technicalRequirements"
            label={tDetails("i14")}
            placeholder={t("i13_placeholder")}
          />
          <InputForm
            value={formState.administrativeRequirements}
            handleChange={handleChange}
            name="administrativeRequirements"
            label={tDetails("i15")}
            placeholder={t("i13_placeholder")}
          />
        </div>
        <div className={styles.form_input}>
          <h4>{tDetails("i16")}</h4>
          <div className={styles.form_compound}>
            <InputForm
              value={formState.clause[0]}
              handleChange={handleChange}
              name="clause"
              index={0}
              label={tDetails("i17")}
              placeholder={t("i17_placeholder")}
            />
            <InputFileForm
              handleChange={handleChange}
              name="clause"
              index={1}
            />
          </div>
        </div>
        <div className={styles.form_input}>
          <InputForm
            value={formState.warranty}
            handleChange={handleChange}
            name="warranty"
            label={tDetails("i19")}
            placeholder={t("i19_placeholder")}
          />
        </div>
        <div className={styles.form_input}>
          <DynamicInputForm
            dynamicInputs={formState.penalties}
            onDynamicInputChange={handleDynamicInputChange}
            type="text"
            name="penalties"
            label={tDetails("i20")}
            placeholder={t("i20_placeholder")}
          />
        </div>
        {/* Penalidades */}
        <div className={styles.form_input}>
          <h4>{tDetails("i23")}</h4>
          <div className={styles.form_compound}>
            <InputForm
              type="datetime-local"
              value={formState.dates.inquiriesStart}
              handleChange={handleDatesChange}
              name="inquiriesStart"
              label={tDetails("i24")}
              min={DATE_NOW_ISO}
            />
            <div className={styles.form_compoundGap}>
              <p>{tDetails("i25")}</p>
            </div>
            <InputForm
              type="datetime-local"
              value={formState.dates.inquiriesEnd}
              handleChange={handleDatesChange}
              name="inquiriesEnd"
              min={DATE_NOW_ISO}
            />
          </div>
          <InputForm
            type="datetime-local"
            value={formState.dates.commitDeadline}
            handleChange={handleDatesChange}
            name="commitDeadline"
            label={tDetails("commit")}
            min={DATE_NOW_ISO}
            required
          />
          <InputForm
            type="datetime-local"
            value={formState.dates.revealDeadline}
            handleChange={handleDatesChange}
            name="revealDeadline"
            label={tDetails("reveal")}
            min={formState.dates.commitDeadline.slice(0, 16) || DATE_NOW_ISO}
            required
          />
          <div className={styles.form_compound}>
            <InputForm
              value={formState.dates.contractStart}
              handleChange={handleDatesChange}
              name="contractStart"
              label={tDetails("i27")}
              placeholder={t("i27_placeholder")}
            />
            <InputForm
              value={formState.dates.contractDuration}
              handleChange={handleDatesChange}
              name="contractDuration"
              label={tDetails("i29")}
              placeholder={t("i29_placeholder")}
            />
          </div>
        </div>
        <CostsDetails feeTypeToShow="contract" />
        <div className={styles.btn_submit}>
          <Button type="main">
            <IconPlus /> {t("title")}
          </Button>
        </div>
      </form>
      {showFormModal && (
        <>
          <div>
            <DynamicFormModal
              onFormSubmit={handleDynamicFormSubmit}
              handleClose={() => setShowFormModal(false)}
            />
          </div>
          <Overlay handleClick={() => setShowFormModal(false)} />
        </>
      )}
    </>
  );
};
