import React, { ChangeEvent } from "react";
import styles from "./InputForm.module.scss";

interface InputFormProps {
  index?: number;
  value: any;
  handleChange: (name: string, value: any, index?: number) => void;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  index,
  value,
  handleChange,
  type = "text",
  name,
  label = null,
  placeholder,
  required = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value, index);
  };

  return (
    <div
      className={`${styles.container} ${
        type == "date" || (type == "datetime-local" && styles.fit)
      }`}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <input
        required={required}
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
