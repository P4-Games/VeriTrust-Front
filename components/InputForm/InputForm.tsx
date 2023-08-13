import React, { ChangeEvent } from "react";
import styles from "./InputForm.module.scss";

interface InputFormProps {
  index?: number;
  value: string;
  handleChange: (name: string, value: any, index?: number) => void;
  type: string;
  name: string;
  label?: string;
  placeholder: string;
}

const InputForm: React.FC<InputFormProps> = ({
  index,
  value,
  handleChange,
  type,
  name,
  label = null,
  placeholder,
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value, index);
  };

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
