'use client';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import styles from '../Tender.module.scss';

import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Tender } from "@/constants/tender";
import { getTender } from "@/utils/tender";
import { Button } from '@/components/Button/Button';
import { IconArrowLeft, IconPremiumRights } from '@tabler/icons-react';
import { NotFound } from '@/components/composed/Tender/NotFound';
import { TenderBody } from '@/components/composed/Tender/TenderBody';
import { Select } from '@/components/composed/Tender/Select/Select';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/composed/Tender/Input/Input';

export default function Page ({ params }: { params: { id: string } }) {
    const [postData, setPostData] = useState<Tender>({} as Tender)
    const [option, setOption] = useState<string>("Sociedad Anónima");
    const [razonSocial, setRazonSocial] = useState<string>("");
    const [cuit, setCuit] = useState<string>("");
    const [domicilio, setDomicilio] = useState<string>("");
    const [router, setRouter] = useState<any>(null);

    useEffect(() => {
        getTender(params.id).then((data) => {
            setPostData(data)
        })
    }, [params.id])
    
    useEffect(() => {
        setRouter(useRouter)
    }, [])

    return (
        <>
            <Navbar />
            {
                postData?.name?.length > 1 ? (
                    <section className={styles.details}>
                        <Breadcrumb 
                            values={[
                                ["Licitaciones", "/marketplace"],
                                ["Detalles de la licitación", "/tender/" + params?.id],
                                ["Ofertar", "/tender/" + params?.id + "/quote"],
                            ]}
                        />
                        <section className={styles.details_head}>
                            <h1 className={styles.details_headTitle}>{postData?.name}</h1>
                            <p>Fecha límite: {postData.dates.reveal} </p>
                            <Button
                                type='main'
                                className={styles.details_headButton}
                            >
                                Ofertar <IconPremiumRights />
                            </Button>
                        </section>
                        <section className={styles.details_body}>
                            <h3 className={styles.details_bodyLabel}>Tipo de proveedor:</h3>
                            <Select 
                                options={[
                                    "Persona Humana",
                                    "Sociedades de hecho",
                                    "Cooperativas",
                                    "Unión Transitoria de Empresas",
                                    "Talleres Protegidos de Producción",
                                    "Sociedades Anónimas",
                                    "Sociedad Responsabilidad Limitada",
                                    "Otras Formas Societarias (Ej: Colectiva, en Com. Simp., S.C.A., de Cap. e Ind.).",
                                    "Organismo Público",
                                    "Persona humana extranjera no residente en el país",
                                    "Persona jurídica extranjera sin sucursal en el país"
                                ]}
                                option={option} 
                                setOption={setOption} 
                            />
                            <Input 
                                value={razonSocial}
                                setValue={setRazonSocial}
                                label='Razón Social'
                                placeholder='Ejemplo S.A.'
                            />
                            <Input 
                                value={cuit}
                                setValue={setCuit}
                                label='Número de CUIT'
                                placeholder='30-12345678-5'
                            />
                            <Input 
                                value={domicilio}
                                setValue={setDomicilio}
                                label='Domicilio Legal (calle y nro, CP, localidad, partido, provincia, pais)'
                                placeholder='Ejemplo 1234, B7600 - Mar del Plata, Gral. Pueyrredón, Buenos Aires, Argentina'
                            />
                            <Button
                                type='main'
                                onClick={()=>{}}
                            >
                                Enviar oferta
                            </Button>
                        </section>
                    </section>
                ) : (
                    <NotFound />
                )
            }
        </>
    )
}


