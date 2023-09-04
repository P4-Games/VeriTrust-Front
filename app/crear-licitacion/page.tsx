"use client";
import React, {
  useState,
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
} from "react";
import styles from "./CrearLicitacion.module.scss";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Button } from "@/components/Button/Button";
import { IconPlus, IconX, IconChevronDown, IconWorld } from "@tabler/icons-react";
import InputForm from "@/components/InputForm/InputForm";
import SwitchForm from "@/components/SwitchForm/SwitchForm";
import DynamicInputForm from "@/components/composed/DynamicInputForm/DynamicInputForm";
import DynamicFormModal from "@/components/composed/DynamicFormModal/DynamicFormModal";
import { TenderItem, Tender } from "@/constants/tender";
import Overlay from "@/components/Overlay/Overlay";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { AnimatePresence, motion } from "framer-motion";
import { getEthereumPrice } from "@/utils/price";

export default function CrearLicitacion(): JSX.Element {
  const [formState, setFormState] = useState<Tender>({
    txid: "",
    name: "",
    type: "Licitacion Pública",
    opening_date: "",
    currency: "",
    scope: "Argentina",
    requires_payment: false,
    allows_extension: false,
    categories: [""],
    quoteType: "Todos los items",
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
    totalCosts += 0.0001; // fees de red
    totalCosts += 20 / ethPrice; // timbrados
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
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
            ["Licitaciones", "/marketplace"],
            // ["Detalles de la licitación", "/tender/"],
          ]}
        />
      </section>
      <main className={styles.main}>
        <div className={styles.title}>
          <h3>Crear Licitación</h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <InputForm
            value={formState.name}
            handleChange={handleChange}
            type="text"
            name="name"
            label="Nombre del proceso:"
            placeholder="Ej. Adquisición de ..."
          />
          <div className={styles.form_input}>
            <InputForm
              value={formState.currency}
              handleChange={handleChange}
              type="text"
              name="currency"
              label="Moneda y alcance:"
              placeholder="Pesos, Argentina"
            />
          </div>
          <div className={styles.form_compound}>
            <SwitchForm
              name="requires_payment"
              checked={formState.requires_payment}
              handleChange={handleChange}
              label="Requiere pago:"
            />
            <SwitchForm
              name="allows_extension"
              checked={formState.allows_extension}
              handleChange={handleChange}
              label="Se acepta prórroga:"
            />
          </div>
          <div className={styles.form_input}>
            <DynamicInputForm
              dynamicInputs={formState.categories}
              onDynamicInputChange={handleDynamicInputChange}
              type="text"
              name="categories"
              label="Rubro/s:"
              placeholder="Escribe un rubro, Ej. Pinturas"
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
            <h4>Detalle de productos o servicios</h4>
            <div className={styles.table_list}>
              <div className={styles.table_listHeader}>
                <h5>#</h5>
                <h5>Objeto del gasto</h5>
                <h5>Código del ítem</h5>
                <h5>Descripción</h5>
                <h5>Cantidad</h5>
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
                          <h3>Información adicional</h3>
                          <p>{item.additionalInfo}</p>
                          <h3>Luegar de entrega</h3>
                          <p>{item.deliveryPlace}</p>
                          <h3>Fecha de entrega</h3>
                          <p>{item.deliveryDeadline}</p>
                        </motion.section>
                      </div>{" "}
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
              <IconPlus /> Añadir producto o servicio
            </button>
          </div>
          <div className={styles.form_compound}>
            <InputForm
              type="file"
              value={formState.pliego}
              handleChange={handleChange}
              name="pliego"
              label="Pliego de bases y condiciones generales"
            />
            <InputForm
              type="file"
              value={formState.disposicionAprobatoria}
              handleChange={handleChange}
              name="disposicionAprobatoria"
              label="Disposición Aprobatoria"
            />
          </div>

          <div className={styles.form_input}>
            <h4>Requisitos mínimos de participación</h4>
            <InputForm
              value={formState.financialRequirements}
              handleChange={handleChange}
              name="financialRequirements"
              label="1. Requisitos económicos y financieros"
              placeholder="Descripción y tipo de documento"
            />
            <InputForm
              value={formState.technicalRequirements}
              handleChange={handleChange}
              name="technicalRequirements"
              label="2. Requisitos técnicos"
              placeholder="Descripción y tipo de documento"
            />
            <InputForm
              value={formState.administrativeRequirements}
              handleChange={handleChange}
              name="administrativeRequirements"
              label="3. Requisitos administrativos"
              placeholder="Descripción y tipo de documento"
            />
          </div>
          <div className={styles.form_input}>
            <h4>Cláusulas particulares</h4>
            <div className={styles.form_compound}>
              <InputForm
                value={formState.clause[0]}
                handleChange={handleChange}
                name="clause"
                label="Documento, Numero GDE, Numero especial, Fecha vinculación"
                placeholder="Ingresar los datos necesarios"
              />
              <InputForm
                type="file"
                value={formState.clause[1]}
                handleChange={handleChange}
                name="clause"
              />
            </div>
          </div>
          <div className={styles.form_input}>
            <InputForm
              value={formState.warranty}
              handleChange={handleChange}
              name="warranty"
              label="Garantías"
              placeholder="Ingresar los datos necesarios, ej. garantía de impugnación a la preadjudicacion, cumplimiento, etc"
            />
          </div>
          <div className={styles.form_input}>
            <DynamicInputForm
              dynamicInputs={formState.penalties}
              onDynamicInputChange={handleDynamicInputChange}
              type="text"
              name="penalties"
              label="Penalidades"
              placeholder="Penalidad segun articulo, etc..."
            />
          </div>
          {/* Penalidades */}
          <div className={styles.form_input}>
            <h4>Información adicional</h4>
            <div className={styles.form_compound}>
              <InputForm
                type="datetime-local"
                value={formState.dates.inquiriesStart}
                handleChange={handleDatesChange}
                name="inquiriesStart"
                label="Fecha y hora de consultas"
              />
              <div className={styles.form_compoundGap}>
                <p>Hasta</p>
              </div>
              <InputForm
                type="datetime-local"
                value={formState.dates.inquiriesEnd}
                handleChange={handleDatesChange}
                name="inquiriesEnd"
              />
            </div>
            <InputForm
              type="datetime-local"
              value={formState.dates.reveal}
              handleChange={handleDatesChange}
              name="reveal"
              label="Fecha y hora de la apertura"
            />
            <div className={styles.form_compound}>
              <InputForm
                value={formState.dates.contractStart}
                handleChange={handleDatesChange}
                name="contractStart"
                label="Inicio del contrato"
                placeholder="Ej. A partir del documento contractual"
              />
              <InputForm
                value={formState.dates.contractDuration}
                handleChange={handleDatesChange}
                name="contractDuration"
                label="Duracion del contrato"
                placeholder="Ej. 3 meses"
              />
            </div>
          </div>
          <section className={styles.details_finalDetails}>
            <h3>Detalles</h3>
            <p>
              {/* Precio total: $ {getFormattedPrice()} {postData.currency}
              <br /> <br /> */}
              <b>Costos:</b> <br />
              Timbrado: $20 USD <br />
              Fees de red: 0.0001 ETH
            </p>
            <h3>Total estimado: {estimateCosts().toFixed(8)} ETH</h3>
          </section>
          <div className={styles.btn_submit}>
            <Button type="main">
              <IconPlus /> Crear licitacion
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
      </main>
      <Footer />
    </>
  );
}
