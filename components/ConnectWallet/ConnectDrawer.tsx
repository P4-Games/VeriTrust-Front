import { IconArrowLeft, IconDownload, IconWorld } from '@tabler/icons-react';
import { useConnect } from 'wagmi';
import styles from "./Drawer.module.scss";
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';

interface ConnectDrawerProps {
  openModal: boolean;
  toggleModal: ()=>void;
}

export function ConnectDrawer({
  openModal,
  toggleModal
}: ConnectDrawerProps) {
  const { connect, connectors, isLoading, pendingConnector, error } =
    useConnect()
    
  return (
    <>
      <AnimatePresence>
        {
          openModal ? (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.1, ease: cubicBezier(0.6,0.6,0,0.1)}}
              className={styles.drawerOverlay}
              onClick={toggleModal}
            />
          ): null
        } 
      </AnimatePresence>
      <AnimatePresence>
        {
          openModal ? (
            <motion.div
              initial={{width: 0}}
              animate={{width: "min(500px, 80%)"}}
              exit={{width: 0}}
              transition={{duration: 0.1, ease: cubicBezier(0.6,0.6,0,0.1)}}
              className={styles.drawer}
            >
              <h3 className={styles.drawer_title}>
                Elige tu billetera
              </h3>
              <section className={styles.drawer_button}>
                {connectors.map((connector) => (
                  <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      ' (connecting)'}
                  </button>
                ))}
              </section>
              <section className={styles.drawer_download}>
                <a href="https://metamask.io/download.html" target="_blank">
                  No tienes billetera? Descargue Metamask haciendo click acá
                  <IconDownload />
                </a>
              </section>
              <button className={styles.drawer_close} onClick={toggleModal}>
                <IconArrowLeft /> Cerrar
              </button>

            </motion.div>
          ): null
        }
      </AnimatePresence>
      {error && <div>{error.message}</div>}
    </>
  )
}
