import styles from "./DynamicFormModal.module.scss";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { TenderItem } from "@/constants/tender";
import { IconX } from "@tabler/icons-react";
import InputForm from "@/components/InputForm/InputForm";
import TextArea from "@/components/TextAreaForm/TextAreaForm";

interface DynamicFormModalProps {
  onFormSubmit: (formData: TenderItem) => void;
  handleClose: () => void;
}

const DynamicFormModal: React.FC<DynamicFormModalProps> = ({
  onFormSubmit,
  handleClose,
}) => {
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
          <h3>Añadir producto o servicio</h3>
          <div className={styles.close} onClick={handleClose}>
            <IconX size={35} />
          </div>
        </header>
        <form onSubmit={handleSubmit} className={styles.dynamic_form}>
          <div className={styles.form_section}>
            <InputForm
              required
              label="Object name"
              name="object"
              handleChange={handleInputChange}
              value={formState.object}
              placeholder="Object name"
            />
            <InputForm
              required
              label="Item ID code"
              name="code"
              handleChange={handleInputChange}
              value={formState.code}
              placeholder="ID code"
            />
            <InputForm
              required
              label="Quantity"
              name="quantity"
              type="number"
              handleChange={handleInputChange}
              value={formState.quantity}
              placeholder="0"
            />
          </div>

          <TextArea
            required
            label="Description"
            name="description"
            handleChange={handleInputChange}
            value={formState.description}
            placeholder="Description"
          />
          <div className={styles.form_section}>
            <InputForm
              label="Delivery place"
              name="deliveryPlace"
              handleChange={handleInputChange}
              value={formState.deliveryPlace}
              placeholder="Delivery place"
            />
            <InputForm
              type="date"
              label="Delivery deadline"
              name="deliveryDeadline"
              handleChange={handleInputChange}
              value={formState.deliveryDeadline}
              placeholder="Delivery deadline"
            />
            <InputForm
              label="Additional Information"
              name="additionalInfo"
              handleChange={handleInputChange}
              value={formState.additionalInfo}
              placeholder="Additional Information"
            />
          </div>
          <button className={styles.btn_submit} type="submit">
            Add
          </button>
        </form>
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default DynamicFormModal;
