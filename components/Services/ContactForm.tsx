"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import styles from "./contactform.module.scss";
import { EmailIcon, PhoneIcon, SendIcon, TextIcon, UserIcon } from "./Icons";

export const ContactForm = ()=>{
    const t = useTranslations("Services");
    const i = useTranslations("Index");
    const FORM_DEF = {
        name: "",
        email: "",
        phone: "",
        message: ""
    }
    const [formData, setFormData] = useState(FORM_DEF);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = () => {
        console.log("Pasé")
        setLoading(true)
        new Promise((resolve, reject) => {
            fetch("https://tdm.ar/api/veritrust_form", {
                method: "POST",
                body: JSON.stringify({ "email": formData.email, "lang": i("newsletter_lang"), "name": formData.name, "phone": formData.phone, "message": formData.message })
            })
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                    if(res?.message != "Sent!"){
                        setError(res.message ?? "");
                    }else{
                        setSuccess(true);
                    }
                });
        }).then((res) => {
            setFormData(FORM_DEF);
            setLoading(false)
        });
    };

    return(
        <>
            <section className={styles.form}>
                <section>
                    <div>
                        <h4><UserIcon /> {t("contact_name")}</h4>
                        <input className={styles.form__input} type="text" placeholder={t("contact_name")} value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                        <h4><EmailIcon /> {t("contact_email")}</h4>
                        <input className={styles.form__input} type="text" placeholder={t("contact_email")} value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                        <h4><PhoneIcon /> {t("contact_phone")}</h4>
                        <input className={styles.form__input} type="text" placeholder={t("contact_phone")} value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
                    </div>
                </section>
                <section>
                    <h4>
                        <TextIcon /> {t("contact_message")}
                    </h4>
                    <textarea className={styles.form__textarea} placeholder={t("contact_message")} value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})} />
                </section>
            </section>
            {
                error ? <div className={styles.form__error}><p>{error}</p></div> : null
            }
            {
                success ? <div className={styles.form__success}><p>{t("contact_success")}</p></div> : null
            }
            <button onClick={handleSubmit} className={loading ? styles.form__buttonLoading : styles.form__button}>{t("contact_button")} <SendIcon /></button>
        </>
    )
}