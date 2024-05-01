import {ReactNode} from 'react';
import ReactDOM from 'react-dom';

import CloseBtn from '@/components/ui/CloseBtn';

import styles from './Modal.module.scss';

interface ModalProps {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
  isModalOpen: boolean;
  children?: ReactNode;
}

export const modalElement = document.getElementById('modal');

const Modal = ({children, isModalOpen, closeModal}: ModalProps) => {
  if (!modalElement) return <></>;

  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${!isModalOpen ? 'hide' : ''}`}>
      <div className={styles.inner}>
        {children}
        <CloseBtn className={styles.closeBtn} onClick={() => closeModal()} />
      </div>
    </div>,
    modalElement,
  );
};

export default Modal;
