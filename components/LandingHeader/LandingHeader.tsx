'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LangButton from "@/components/LangButton/LangButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logo } from "@/assets";
import { useTranslations } from "next-intl";
import styles from "./LandingHeader.module.scss";
import { isMobile } from "react-device-detect";

export default function LandingHeader() {
  const router = useRouter();
  const handleOpenHome = () => router.push("/");
  const i = useTranslations("Index");

  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    }
  }, []);

  return (
    <header className={styles.header}>
      <Image
        width={60}
        height={60}
        src={logo}
        alt="VeriTrust logo"
        onClick={handleOpenHome}
      />
      <div className={styles.header_links}>
        <Link href={"/services"}>{isMobile ? i("nav_contact") : i("nav_org")}</Link>
        <Link href={"/team"}>{i("nav_team")}</Link>
        <LangButton />
      </div>
    </header>
  );
}
