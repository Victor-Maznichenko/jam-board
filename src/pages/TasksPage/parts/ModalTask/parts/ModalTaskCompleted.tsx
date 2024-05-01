import Modal from '@/components/Modal';

import {ModalTaskProps} from '../../../types';
import styles from '../ModalTask.module.scss';

const ModalTaskCompleted = ({isModalOpen, closeModal, task}: ModalTaskProps) => (
  <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
    <h2 className={styles.title}>{task.title}</h2>
    <p className={styles.description}>{task.description}</p>
    <p className={styles.authorName}>{task.authorName}</p>
    <p className={styles.performerName}>{task.performerName}</p>
  </Modal>
);

export default ModalTaskCompleted;
