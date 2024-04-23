import {useModal} from '@/hooks';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

import ModalAddTask from '../ModalAddTask';
import styles from './AddTask.module.scss';

const AddTask = () => {
  const {isModalOpen, closeModal, openModal} = useModal();

  return (
    <>
      <Button onClick={openModal} className={styles.addTask}>
        <Icon width={20} height={20} name="plus" />
        <span className={styles.text}>Добавить задачу</span>
      </Button>
      <ModalAddTask isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default AddTask;
