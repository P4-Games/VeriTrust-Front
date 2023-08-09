import styles from "./page.module.scss";
import { logo, marketplace, mouse, envelope } from "./_assets/";
import Image from "next/image";
import Footer from "./_components/Footer/Footer";
import SubscribeForm from "./_components/SubscribeForm/SubscribeForm";

export default function Home() {
  const pattern = " • VeriTrust";
  const repetitions = 42;

  return (
    <>
      <main className={styles.main}>
        <header className={styles.logo}>
          <Image src={logo} alt="VeriTrust logo" />
        </header>
        <section className={styles.first_section}>
          <div className={styles.intro_text}>
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
          <div className={styles.second_section_body}>
            <div className={styles.marketplace}>
              <h3>Marketplace</h3>
              <p>
                Facilita la búsqueda y promoción de oportunidades, asegurando un
                ambiente transparente y competitivo para todas las partes.
              </p>
              <div className={styles.marketplace_img}>
                <Image
                  width={343}
                  height={286}
                  src={marketplace}
                  alt="marketplace image"
                />
              </div>
            </div>
            <div className={styles.characteristics}>
              <div>
                <div>
                  <h3>Privacidad de las propuestas</h3>
                  <p>
                    Facilita la búsqueda y promoción de oportunidades,
                    asegurando un ambiente transparente y competitivo para todas
                    las partes.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h3>Reveal en Blockchain</h3>
                  <p>
                    A traves de tecnología blockchain se hace el “reveal” de
                    forma pública, transparente e inmutable.
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
          </div>
        </section>
        <div className={styles.repeat_pattern}>
          <p>{Array(repetitions).fill(pattern).join("")}</p>
        </div>
        <section className={styles.third_section}>
          <h2>Beneficios clave</h2>
          <div className={styles.card_container}>
            <div>
              <h3>Mayor Seguridad y Transparencia</h3>
            </div>
            <div>
              <h3>Privacidad de las Propuestas</h3>
            </div>
            <div>
              <h3>Verificabilidad y Auditoría</h3>
            </div>
            <div>
              <h3>Eficiencia y Ahorro de Costos</h3>
            </div>
          </div>
        </section>
        <section className={styles.newsletter}>
          <div className={styles.envelope_img}>
            <Image src={envelope} alt="envelop image" />
          </div>
          <div>
            <h3>Recibe las últimas novedades!</h3>
            <p>
              Solo enviaremos contenido cada tanto, asegurandonos que aporta
              valor.
            </p>
          </div>
          <SubscribeForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
