import React, { useState, useEffect } from "react";
import styles from "./InputFileForm.module.scss";
import {
  IconCheck,
  IconLoader2,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { ipfsUploadFile } from "@/utils/ipfsServices";
import { toast } from "react-toastify";

interface InputFormProps {
  index?: number;
  handleChange: (name: string, value: any, index?: number) => void;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

type uploadState = "" | "complete" | "loading" | "error";

const InputFileForm: React.FC<InputFormProps> = ({
  index,
  handleChange,
  name,
  label = null,
  placeholder,
  required = false,
}) => {
  const [uploadState, setUploadState] = useState<uploadState>("");

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.value === "") {
      setUploadState("");
      handleChange(name, "", index);
      return;
    }
    setUploadState("loading");
    let ipfsHash = "";
    const fileResponse = await ipfsUploadFile(e.target.files[0]);
    if (fileResponse.isOk) {
      ipfsHash = fileResponse.data;
      setUploadState("complete");
      handleChange(name, ipfsHash, index);
    } else {
      toast.error("Could not upload file!");
      setUploadState("error");
    }
  };

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={styles.container_input}>
        <input
          id={name}
          required={required}
          type="file"
          name={name}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {uploadState == "loading" ? (
          <IconLoader2 className={`${styles.spinner} ${styles.file_status}`} />
        ) : uploadState == "complete" ? (
          <IconCheck className={`${styles.check} ${styles.file_status}`} />
        ) : (
          uploadState == "error" && (
            <IconExclamationCircle
              className={`${styles.error} ${styles.file_status}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default InputFileForm;
