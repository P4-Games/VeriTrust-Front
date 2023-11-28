import React from "react";
import Image from "next/image";
import LangButton from "@/components/LangButton/LangButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logo } from "@/assets";
import { useTranslations } from "next-intl";
import styles from "./LandingHeader.module.scss";

export default function LandingHeader() {
  const router = useRouter();
  const handleOpenHome = () => router.push("/");
  const i = useTranslations("Index");

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
        <Link href={"/services"}>{i("nav_org")}</Link>
        <Link href={"/team"}>{i("nav_team")}</Link>
        <LangButton />
      </div>
    </header>
  );
}
