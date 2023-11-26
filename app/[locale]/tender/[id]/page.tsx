'use client'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import styles from './Tender.module.scss';

import { Navbar } from "@/components/composed/Navbar/Navbar";
import { Tender } from "@/constants/tender";
import { getTender } from "@/utils/tender";
import { Button } from '@/components/Button/Button';
import { IconPremiumRights } from '@tabler/icons-react';
import { NotFound } from '@/components/composed/Tender/NotFound';
import { TenderBody } from '@/components/composed/Tender/TenderBody';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Page ({ params }: { params: { id: string } }) {
    const [postData, setPostData] = useState<Tender>({} as Tender);
    const [loading, setLoading] = useState<boolean>(true);

    const t = useTranslations('Details');

    useEffect(()=>{
        getTender(params.id).then((data) => {
            setLoading(false);
            setPostData(data);
        })
    },[params.id]);

    return (
        <>
            <Navbar />
            {
                postData?.name?.length > 1 ? (
                    <section className={styles.details}>
                        <Breadcrumb 
                            values={[
                                ["Tenders", "/marketplace"],
                                ["Tender details", "/tender/" + params?.id],
                            ]}
                        />
                        <section className={styles.details_head}>
                            <h1 className={styles.details_headTitle}>{postData?.name}</h1>
                            <p>{t("subheading")} {postData.dates?.reveal} </p>
                            <Button
                                redirectTo={'/tender/' + params?.id + "/quote"}
                                type='main'
                                className={styles.details_headButton}
                            >
                                {t("button")} <IconPremiumRights />
                            </Button>
                        </section>
                        <TenderBody tender={postData} />
                    </section>
                ) : (
                    <>
                        {loading ? <p>{t("loading")}</p> : <NotFound />}
                    </>
                )
            }
        </>
    )
}


