"use client";
import React, {
  useState,
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
} from "react";
import styles from "./CrearLicitacion.module.scss";
import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Button } from "@/components/Button/Button";
import { IconPlus } from "@tabler/icons-react";
import InputForm from "@/components/InputForm/InputForm";
import SwitchForm from "@/components/SwitchForm/SwitchForm";
import DynamicInputForm from "@/components/composed/DynamicInputForm/DynamicInputForm";

interface FormState {
  name: string;
  currency: string;
  requiresPayment: boolean;
  extensionAcceptance: boolean;
  rubros: string[];
}

export default function CrearLicitacion(): JSX.Element {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    currency: "",
    requiresPayment: false,
    extensionAcceptance: false,
    rubros: [""],
  });

  const handleChange = (name: string, inputValue: any) => {
    setFormState({
      ...formState,
      [name]: inputValue,
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

  return (
    <>
      {/* <Navbar /> */}
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
            <label htmlFor="currency">Moneda y alcance:</label>
            {/* <select
              name="currency"
              value={formState.currency}
              onChange={handleChange}
            >
              <option value="">Select a currency</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select> */}
          </div>
          <div className={styles.form_compound}>
            <SwitchForm
              name="requiresPayment"
              checked={formState.requiresPayment}
              handleChange={handleChange}
              label="Requiere pago:"
            />
            <SwitchForm
              name="extensionAcceptance"
              checked={formState.extensionAcceptance}
              handleChange={handleChange}
              label="Se acepta prórroga:"
            />
          </div>
          <div className={styles.form_input}>
            <DynamicInputForm
              dynamicInputs={formState.rubros}
              onDynamicInputChange={handleDynamicInputChange}
              type="text"
              name="rubros"
              label="Rubro/s:"
              placeholder="Escribe un rubro, Ej. Pinturas"
            />
          </div>
          {/* <div>
            <label htmlFor=""></label>
            <input type="datetime-local" />
          </div> */}
          <div>
            {/* type submit? */}
            <Button type="main">
              <IconPlus /> Crear licitacion
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
