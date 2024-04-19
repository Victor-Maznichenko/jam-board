import ReactDOM from 'react-dom';

import Button from '@/components/ui/Button';
import CloseBtn from '@/components/ui/CloseBtn';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';

import styles from './ModalAddTask.module.scss';

interface ModalAddTaskProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const portal = document.getElementById('modal-add-task');

const ModalAddTask = ({isModalOpen, closeModal}: ModalAddTaskProps) => {
  if (!portal) return null;

  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${!isModalOpen ? styles.hide : ''}`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Создать задачу</h2>
        <form onSubmit={() => console.log('submit')}>
          <Input className={styles.input} placeholder="Название задачи" name="title" required />
          <TextArea className={styles.textarea} placeholder="Описание задачи" name="description" />
          <Button className={styles.button} type="submit">
            Создать задачу
          </Button>
        </form>
        <CloseBtn className={styles.closeBtn} onClick={closeModal} />
      </div>
    </div>,
    portal,
  );
};

export default ModalAddTask;
