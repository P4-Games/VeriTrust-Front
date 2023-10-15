import React, { ChangeEvent, useState } from "react";
import styles from "./DynamicInputForm.module.scss";
import InputForm from "@/components/InputForm/InputForm";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface DynamicFormProps {
  dynamicInputs: string[];
  onDynamicInputChange: (name: string, dynamicInputs: string[]) => void;
  type: string;
  name: string;
  label: string;
  placeholder: string;
}

const DynamicInputForm: React.FC<DynamicFormProps> = ({
  dynamicInputs,
  onDynamicInputChange,
  type,
  name,
  label,
  placeholder,
}) => {
  const [formState, setFormState] = useState<string[]>(dynamicInputs);
  const t = useTranslations("CreateTender");

  const addInput = () => {
    const updatedForm = [...formState, ""];
    setFormState(updatedForm);
    onDynamicInputChange(name, updatedForm);
  };

  const removeLastInput = () => {
    if (formState.length > 1) {
      const updatedForm = formState.slice(0, -1);
      setFormState(updatedForm);
      onDynamicInputChange(name, updatedForm);
    }
  };

  const handleChange = (inputName: string, inputValue: any, index?: number) => {
    if (index != undefined) {
      const updatedDynamicInputs = [...formState];
      updatedDynamicInputs[index] = inputValue;
      setFormState(updatedDynamicInputs);
      onDynamicInputChange(name, updatedDynamicInputs);
    }
  };

  return (
    <div className={styles.dynamic_input_form}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.inputs_container}>
        {formState.map((inputValue, index) => (
          <div key={index}>
            <InputForm
              index={index}
              name={name + "-" + index}
              placeholder={placeholder}
              value={inputValue}
              type={type}
              handleChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className={styles.btns_container}>
        <button onClick={addInput} type="button">
          <IconPlus /> {t("categoriesAction1")}
        </button>
        <button onClick={removeLastInput} type="button">
          <IconX /> {t("categoriesAction2")}
        </button>
      </div>
    </div>
  );
};

export default DynamicInputForm;
