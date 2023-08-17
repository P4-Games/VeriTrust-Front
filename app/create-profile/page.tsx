"use client";
import React, { useState, FormEvent, useEffect } from "react";
import styles from "./CreateProfile.module.scss";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Select } from "@/components/composed/Tender/Select/Select";
import InputForm from "@/components/InputForm/InputForm";
import DynamicInputForm from "@/components/composed/DynamicInputForm/DynamicInputForm";
import Footer from "@/components/Footer/Footer";
import { Button } from "@/components/Button/Button";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { offer } from "@/assets";

interface FormProps {
  name: string;
  provider: string;
  address: string;
  cuit: number;
  categories: string[];
}

export default function CreateProfile() {
  const [option, setOption] = useState<string>("Sociedad Anónima");
  const [formState, setFormState] = useState<FormProps>({
    name: "",
    provider: option,
    address: "",
    cuit: 0,
    categories: [""],
  });

  useEffect(() => {
    handleChange("provider", option);
  }, [option]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
  };

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

  return (
    <div>
      <Navbar />
      <main className={styles.profile}>
        <header className={styles.profile_header}>
          <h1>Creá tu perfil</h1>
          <p>
            Para evitar repetir siempre los mismos datos, podes crear tu perfil
            como oferente, para así simplificar la aplicación y búsqueda de
            licitaciones.
          </p>
        </header>
        <section className={styles.profile_body}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <h3 className={styles.label}>Tipo de proveedor:</h3>
              <Select
                options={[
                  "Persona Humana",
                  "Sociedades de hecho",
                  "Cooperativas",
                  "Unión Transitoria de Empresas",
                  "Talleres Protegidos de Producción",
                  "Sociedades Anónimas",
                  "Sociedad Responsabilidad Limitada",
                  "Otras Formas Societarias (Ej: Colectiva, en Com. Simp., S.C.A)",
                  "Organismo Público",
                  "Persona humana extranjera no residente en el país",
                  "Persona jurídica extranjera sin sucursal en el país",
                ]}
                option={option}
                setOption={setOption}
              />
            </div>

            <InputForm
              value={formState.name}
              handleChange={handleChange}
              type="text"
              name="name"
              label="Razon Social:"
              placeholder="Ejemplo S.A"
            />
            <InputForm
              value={formState.cuit}
              handleChange={handleChange}
              type="number"
              name="cuit"
              label="Numero de CUIT"
              placeholder="01-12345678-1"
            />
            <InputForm
              value={formState.address}
              handleChange={handleChange}
              type="text"
              name="address"
              label="Domicilio Legal (calle y nro, CP, localidad, partido, provincia, pais)"
              placeholder="Ejemplo 1234, B7600 - Mar del Plata, Gral. Pueyrredón, Buenos Aires, Argentina"
            />
            <DynamicInputForm
              dynamicInputs={formState.categories}
              onDynamicInputChange={handleDynamicInputChange}
              type="text"
              name="categories"
              label="Rubro/s:"
              placeholder="Escribe un rubro, Ej. Pinturas"
            />
            <div className={styles.btn_submit}>
              <Button type="main">
                <IconPlus /> Crear perfil
              </Button>
            </div>
          </form>
          <div className={styles.img_container}>
            <Image
              sizes="100vw"
              style={{ width: "100%", height: "auto", maxWidth: "320px" }}
              src={offer}
              alt="offer image"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
