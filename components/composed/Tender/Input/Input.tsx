import styles from './Input.module.scss';
import React from "react"


interface InputProps{
    placeholder?: string;
    type?: string;
    value: string | number;
    label?: string | null;
    setValue: (React.Dispatch<React.SetStateAction<string>> | ((x: number) => void));
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
                            onChange={(e: any) => setValue(e.target.value)}
                        />
                    </div>
                ) : (
                    <input 
                        type={type} 
                        placeholder={placeholder}
                        className={styles.input}
                        value={value}
                        onChange={(e: any) => setValue(e.target.value)}
                    />
                )
            }
        </>
    )
}