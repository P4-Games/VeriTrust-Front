import styles from "./page.module.scss";
import { logo, marketplace, mouse } from "./_assets/";
import Image from "next/image";
// import PrimaryButton from "./_components/PrimaryButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.first_section}>
        <div className={styles.logo}>
          <Image src={logo} alt="VeriTrust logo" />
        </div>
        <div className={styles.intro_texts}>
          <h2>Licita con confianza, VeriTrust te respalda</h2>
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
      <section className={styles.second_section}>
        <h2>Características</h2>
        <div className={styles.marketplace}>
          <h3>Marketplace</h3>
          <p>
            Facilita la búsqueda y promoción de oportunidades, asegurando un
            ambiente transparente y competitivo para todas las partes.
          </p>
          <div>
            <Image src={marketplace} alt="marketplace image" />
          </div>
        </div>
        <div className={styles.characteristics}>
          <div>
            <div>
              <h3>Privacidad de las propuestas</h3>
              <p>
                Facilita la búsqueda y promoción de oportunidades, asegurando un
                ambiente transparente y competitivo para todas las partes.
              </p>
            </div>
          </div>
          <div>
            <div>
              <h3>Reveal en Blockchain</h3>
              <p>
                A traves de tecnología blockchain se hace el “reveal” de forma
                pública, transparente e inmutable.
              </p>
            </div>
          </div>
          <div>
            <div>
              <h3>Arbitraje</h3>
              <p>
                En casos de disputas o reclamos. Integramos a Kleros, donde
                expertos toman decisiones imparciales
              </p>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
}
