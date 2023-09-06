"use client";
import React, {
  useState,
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
} from "react";
import styles from "./CreateTender.module.scss";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Button } from "@/components/Button/Button";
import {
  IconPlus,
  IconX,
  IconChevronDown,
  IconWorld,
} from "@tabler/icons-react";
import InputForm from "@/components/InputForm/InputForm";
import SwitchForm from "@/components/SwitchForm/SwitchForm";
import DynamicInputForm from "@/components/composed/DynamicInputForm/DynamicInputForm";
import DynamicFormModal from "@/components/composed/DynamicFormModal/DynamicFormModal";
import { TenderItem, Tender } from "@/constants/tender";
import Overlay from "@/components/Overlay/Overlay";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { AnimatePresence, motion } from "framer-motion";
import { getEthereumPrice } from "@/utils/price";
import { useContractWrite } from "wagmi";
import contractABI from "../../constants/contractABI.json";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Form } from "@/components/composed/Tender/Create/Form";

export default function CreateTender(): JSX.Element {
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
    pliego: "", //IPFS Hash (PDF) - Pliego
    disposicionAprobatoria: "", //IPFS Hash (PDF)
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
      reveal: "",
      contractStart: "", // It should be "A partir del documento contractual"
      contractDuration: "", // E.g. "3 months"
    },
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [showTableRow, setShowTableRow] = useState(-1);
  const [ethPrice, setEthPrice] = useState<number>(0);
  

  

  useEffect(() => {
    getEthereumPrice().then((price) => {
      setEthPrice(price);
    });
  }, []);

  const estimateCosts = () => {
    let totalCosts: number = 0;
    totalCosts += 0.0006 * ethPrice; // fees de red
    totalCosts += 20; // ethPrice; // timbrados
    return totalCosts;
  };

  const handleChange = (name: string, inputValue: any) => {
    setFormState({
      ...formState,
      [name]: inputValue,
    });
  };

  const handleDatesChange = (name: string, inputValue: any) => {
    setFormState({
      ...formState,
      dates: {
        ...formState.dates,
        [name]: inputValue,
      },
    });
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

  return (
    <>
      <Navbar />
      <section className={styles.breadcrumbs}>
        <Breadcrumb
          values={[
            ["Tenders", "/marketplace"],
            // ["Tender details", "/tender/"],
          ]}
        />
      </section>
      <main className={styles.main}>
        <div className={styles.title}>
          <h3>Create tender</h3>
        </div>
        
          <Form 
            estimateCosts={estimateCosts}
            formState={formState}
            handleChange={handleChange}
            handleDatesChange={handleDatesChange}
            handleDeleteRow={handleDeleteRow}
            handleDynamicInputChange={handleDynamicInputChange}
            handleShowMore={handleShowMore}
            setShowFormModal={setShowFormModal}
            showTableRow={showTableRow}
          />
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
      </main>
      <Footer />
    </>
  );
}
