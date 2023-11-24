"use client";
import { Navbar } from "@/components/composed/Navbar/Navbar";
import styles from "./Profile.module.scss"
import { ProfileBody } from "@/components/composed/Profile/ProfileBody";
import Footer from "@/components/Footer/Footer";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <section className={styles.profile}>
        <ProfileBody />
      </section>
      <Footer />
    </div>
  );
}
