import styles from "./page.module.scss";
import { logo, mouse } from "./_assets/";
import Image from "next/image";
// import PrimaryButton from "./_components/PrimaryButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.landing}>
        <div className={styles.logo}>
          <Image src={logo} alt="VeriTrust logo" />
        </div>
        <div className={styles.intro_texts}>
          <h1>Licita con confianza, VeriTrust te respalda</h1>
          <p>
            Reinventamos el sistema de licitaciones brindando mayor seguridad,
            transparencia y confianza en los procesos de contratación.
          </p>
        </div>
        <button className={styles.button} type="button">
          Ingresar a la app
        </button>
        <div className={styles.scroll_text}>
          <p>Haga scroll para ver mas</p>
          <Image src={mouse} alt="mouse icon" />
        </div>
      </section>
    </main>
  );
}
