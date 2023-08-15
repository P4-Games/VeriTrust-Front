import styles from './Input.module.scss';
import React from "react"


interface InputProps{
    placeholder?: string;
    type?: string;
    value: string;
    label?: string
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({placeholder = "Enter text", type = "Text", value, setValue, label}: InputProps) => {
    return (
        <>
            {
                label ? (
                    <div className={styles.inputWrapper}>
                        <h3 className={styles.inputLabel}>
                            {label}
                        </h3>
                        <input 
                            type={type} 
                            placeholder={placeholder}
                            className={styles.input}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                ) : (
                    <input 
                        type={type} 
                        placeholder={placeholder}
                        className={styles.input}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                )
            }
        </>
    )
}