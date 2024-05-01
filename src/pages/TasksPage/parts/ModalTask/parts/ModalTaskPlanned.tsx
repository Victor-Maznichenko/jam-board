import {useUnit} from 'effector-react';
import {useState} from 'react';

import {TaskStatus, UserRole} from '@/api/constants';
import $userState from '@/store/profile';
import {changeTaskFx} from '@/store/tasks';

import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';

import {ModalTaskProps} from '../../../types';
import styles from '../ModalTask.module.scss';
import DeadlineChoose from './DeadlineChoose';

const ModalTaskPlanned = ({isModalOpen, closeModal, task}: ModalTaskProps) => {
  const {user} = useUnit($userState);
  const [deadlineDate, setDeadlineDate] = useState(new Date());

  const handleClick = () => {
    const isConfirm = confirm('Ты готов взяться за задачу?');
    if (isConfirm && user.role !== UserRole.VIEWER) {
      changeTaskFx({
        ...task,
        performerUID: user.uid,
        status: TaskStatus.Progress,
        performerName: user.displayName,
        deadlineDate: deadlineDate.toDateString(),
      });
      closeModal();
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
      <h2 className={styles.title}>{task.title}</h2>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.authorName}>{task.authorName}</p>
      <DeadlineChoose taskStatus={task.status} date={deadlineDate} setDate={setDeadlineDate} />

      <Button className={styles.button} onClick={handleClick}>
        Беру в работу!
      </Button>
    </Modal>
  );
};

export default ModalTaskPlanned;
