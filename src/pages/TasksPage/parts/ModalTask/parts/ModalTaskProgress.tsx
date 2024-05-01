import {useUnit} from 'effector-react';

import {TaskStatus} from '@/api/constants';
import $userState from '@/store/profile';
import {changeTaskFx} from '@/store/tasks';
import {formatDate} from '@/utils/helpers';

import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

import {ModalTaskProps} from '../../../types';
import styles from '../ModalTask.module.scss';

const ModalTaskProgress = ({isModalOpen, closeModal, task}: ModalTaskProps) => {
  const {user} = useUnit($userState);
  const isAviable = user.uid === task.performerUID;

  const handleClick = () => {
    const isConfirm = confirm('Подтвердить выполнение задачи?');
    if (isConfirm && isAviable) {
      changeTaskFx({
        ...task,
        status: TaskStatus.Completed,
        completedDate: new Date().toDateString(),
      });
      closeModal();
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
      <h2 className={styles.title}>{task.title}</h2>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.deadlineText}>
        <Icon width={16} height={16} name="clock" />
        <span>Крайний срок: {task.deadlineDate && formatDate(task.deadlineDate)}</span>
      </p>
      <p className={styles.authorName}>{task.authorName}</p>
      <p className={styles.performerName}>{task.performerName}</p>

      {isAviable && (
        <Button className={styles.button} onClick={handleClick}>
          Я выполнил задачу!
        </Button>
      )}
    </Modal>
  );
};

export default ModalTaskProgress;
