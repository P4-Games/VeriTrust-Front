import React, { ChangeEvent } from "react";
import styles from "./SwitchForm.module.scss";

interface SwitchFormProps {
  checked: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const SwitchForm: React.FC<SwitchFormProps> = ({
  checked,
  handleChange,
  name,
  label,
}) => {
  return (
    <div className={styles.form_input}>
      <label htmlFor={name}>{label}</label>
      <label className={styles.switch}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default SwitchForm;
