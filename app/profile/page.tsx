"use client";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import styles from "./Profile.module.scss"
import { ProfileBody } from "@/components/composed/Profile/ProfileBody";

export default function Profile(): JSX.Element {
  return (
    <div>
      <Navbar />
      <section className={styles.profile}>
        <ProfileBody />
      </section>
    </div>
  );
}
