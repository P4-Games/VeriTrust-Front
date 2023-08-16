import styles from "../Button/Button.module.scss";

import { IconCurrencyEthereum, IconUnlink, IconWallet } from '@tabler/icons-react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../Button/Button';
import { ConnectDrawer } from './ConnectDrawer';
import { formatAddress } from "@/utils/format";


export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address })
  
  const { disconnect } = useDisconnect()

  const [showUnlink, setShowUnlink] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleDisconnect = async () => disconnect();
  const handleMouseEnter = () => setShowUnlink(true);
  const handleMouseLeave = () => setShowUnlink(false);
  const toggleModal = ()=> setOpenModal(!openModal);

  if (isConnected) {
    return (
      <section className={styles.button_connected}>
        <section className={styles.button_connectedAddress}>
          <IconCurrencyEthereum />
          <div>{ensName ? ensName : formatAddress(address || "")}</div>
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
        <Button
          type='alt'
        >
          Connect wallet <IconWallet />
        </Button>
      </div>
      <ConnectDrawer openModal={openModal} toggleModal={toggleModal} />
    </div>
  )
}
