import React, { ChangeEvent } from "react";
import styles from "./TextAreaForm.module.scss";

interface TextAreaProps {
  index?: number;
  value: any;
  handleChange: (name: string, value: any, index?: number) => void;
  name: string;
  label?: string;
  placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  index,
  value,
  handleChange,
  name,
  label = null,
  placeholder,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(name, e.target.value, index);
  };

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        rows={4}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;