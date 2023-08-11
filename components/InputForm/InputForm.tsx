import React, { ChangeEvent } from "react";
import styles from "./InputForm.module.scss";

interface InputFormProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  label: string;
  placeholder: string;
}

const InputForm: React.FC<InputFormProps> = ({
  value,
  handleChange,
  type,
  name,
  label,
  placeholder,
}) => {
  return (
    <div className={styles.form_input}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
