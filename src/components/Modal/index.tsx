import {ReactNode} from 'react';

import CloseBtn from '@/components/ui/CloseBtn';

import styles from './Modal.module.scss';

interface ModalProps {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
  isModalOpen: boolean;
  children?: ReactNode;
}

const Modal = ({children, isModalOpen, closeModal}: ModalProps) => {
  return (
    <div className={`${styles.modal} ${!isModalOpen ? 'hide' : ''}`}>
      <div className={styles.inner}>
        {children}
        <CloseBtn className={styles.closeBtn} onClick={() => closeModal()} />
      </div>
    </div>
  );
};

export default Modal;
