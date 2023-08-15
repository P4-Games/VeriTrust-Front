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
import { Select } from '@/components/composed/Tender/Select';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page ({ params }: { params: { id: string } }) {
    const [postData, setPostData] = useState<Tender>({} as Tender)
    const [option, setOption] = useState<string>("Sociedad Anónima");
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
                            <h3>Tipo de proveedor:</h3>
                            <Select 
                                options={[
                                    "Sociedad Anónima",
                                    "Sociedad de Responsabilidad Limitada",
                                ]}
                                option={option} 
                                setOption={setOption} 
                            />
                        </section>
                    </section>
                ) : (
                    <NotFound />
                )
            }
        </>
    )
}


