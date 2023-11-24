import styles from "./DynamicFormModal.module.scss";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { TenderItem } from "@/constants/tender";
import { IconX } from "@tabler/icons-react";
import InputForm from "@/components/InputForm/InputForm";
import TextArea from "@/components/TextAreaForm/TextAreaForm";
import { useTranslations } from "next-intl";

interface DynamicFormModalProps {
  onFormSubmit: (formData: TenderItem) => void;
  handleClose: () => void;
}

const DynamicFormModal: React.FC<DynamicFormModalProps> = ({
  onFormSubmit,
  handleClose,
}) => {
  const t = useTranslations("CreateTender");
  const [formState, setFormState] = useState<TenderItem>({
    id: 0,
    object: "",
    code: "",
    description: "",
    quantity: 0,
  });

  const handleInputChange = (name: string, inputValue: any) => {
    setFormState({
      ...formState,
      [name]: inputValue,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleClose();
    onFormSubmit(formState);
  };

  return (
    <div className={styles.modal_container}>
      {/* <button onClick={() => setModalIsOpen(true)}>Add Item</button> */}
      {/* <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}> */}
      <div className={styles.modal}>
        <header>
          <h3>{t("productDetailTitle")}</h3>
          <div className={styles.close} onClick={handleClose}>
            <IconX size={35} />
          </div>
        </header>
        <form onSubmit={handleSubmit} className={styles.dynamic_form}>
          <div className={styles.form_section}>
            <InputForm
              required
              label={t("productsHeading2")}
              name="object"
              handleChange={handleInputChange}
              value={formState.object}
              placeholder={t("productsHeading2")}
            />
            <InputForm
              required
              label={t("productsHeading3")}
              name="code"
              handleChange={handleInputChange}
              value={formState.code}
              placeholder={t("productsHeading3")}
            />
            <InputForm
              required
              label={t("productsHeading5")}
              name="quantity"
              type="number"
              handleChange={handleInputChange}
              value={formState.quantity}
              placeholder="0"
            />
          </div>

          <TextArea
            required
            label={t("productsHeading4")}
            name="description"
            handleChange={handleInputChange}
            value={formState.description}
            placeholder={t("productsHeading4")}
          />
          <div className={styles.form_section}>
            <InputForm
              label={t("productDetail2")}
              name="deliveryPlace"
              handleChange={handleInputChange}
              value={formState.deliveryPlace}
              placeholder={t("productDetail2")} 
            />
            <InputForm
              type="date"
              label={t("productDetail3")}
              name="deliveryDeadline"
              handleChange={handleInputChange}
              value={formState.deliveryDeadline}
              placeholder={t("productDetail3")}
            />
            <InputForm
              label={t("productDetail1")}
              name="additionalInfo"
              handleChange={handleInputChange}
              value={formState.additionalInfo}
              placeholder={t("productDetail1")}
            />
          </div>
          <button className={styles.btn_submit} type="submit">
            {t("productDetailAction")}
          </button>
        </form>
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default DynamicFormModal;
