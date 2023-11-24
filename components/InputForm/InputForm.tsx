import React from "react";
import styles from "./InputForm.module.scss";

interface InputFormProps {
  index?: number;
  value?: string | number;
  handleChange: (name: string, value: any, index?: number) => void;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
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
  min = undefined,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value, index);
  };
  return (
    <div
      className={`${styles.container} ${
        (type == "date" || type == "datetime-local") && styles.fit
      } `}
    >
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        min={min}
      />
    </div>
  );
};

export default InputForm;
