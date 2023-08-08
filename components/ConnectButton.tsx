import { IconArrowLeft, IconCurrencyEthereum, IconDownload, IconLink, IconUnlink, IconWallet, IconX } from '@tabler/icons-react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
import styles from "./Button.module.scss";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './Button';


export function ConnectButton() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  const [showUnlink, setShowUnlink] = useState<boolean>(false);

  const handleDisconnect = async () => {
    disconnect()
  }

  const handleMouseEnter = () => setShowUnlink(true);
  const handleMouseLeave = () => setShowUnlink(false);

  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const toggleModal = ()=> setOpenModal(!openModal);

  if (isConnected) {
    return (
      <section className={styles.button_connected}>
        <section className={styles.button_connectedAddress}>
          <IconCurrencyEthereum />
          <div>{ensName ? ensName : address}</div>
        </section>
        <button 
          onClick={handleDisconnect}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >Disconnect
          <AnimatePresence>
            {
              showUnlink ? (
                <motion.div
                  initial={{opacity: 0, marginLeft: 0}}
                  animate={{opacity: 1, marginLeft: 10}}
                  exit={{opacity: 0, marginLeft: 0}}
                > 
                  <IconUnlink /> 
                </motion.div> 
              ): null
            }
          </AnimatePresence> 
        </button>
      </section>
    )
  }

  return (
    <div>
      <div onClick={toggleModal}>
        <Button>
          Connect wallet <IconWallet />
        </Button>
      </div>
      <AnimatePresence>
        {
          !openModal ? (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className={styles.drawerOverlay}
            />
          ): null
        } 
      </AnimatePresence>
      <AnimatePresence>
        {
          !openModal ? (
            <motion.div
              initial={{width: 0}}
              animate={{width: "min(500px, 80%)"}}
              exit={{width: 0}}
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
    </div>
  )
}
