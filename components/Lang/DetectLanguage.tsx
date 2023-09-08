//This empty component is intended to be a client component that based on the IP Address of the client (when the page is loaded) it switches the language 
'use client';
import { getLanguage } from "@/utils/ip";
import { useRouter } from "next/navigation";
import React, {useEffect} from "react";

interface DetectLanguageProps{
    redirect?: string;
}
export const DetectLanguage = ({redirect}: DetectLanguageProps) => {
    const router = useRouter();
    useEffect(() => {
        getLanguage().then((lang) => {
            if(lang == "ES"){
                router.push(redirect ? redirect + "/es" : "/es");
            }
            if(lang == "EN"){
                router.push(redirect ? redirect + "/" : "/");
            }
        });
    }, [])
    return (
        <></>
    )
}