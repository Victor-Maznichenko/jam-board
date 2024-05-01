import {memo} from 'react';

import {formatDate} from '@/utils/helpers';
import {useModal} from '@/utils/hooks';

import ModalTask from '../ModalTask';
import styles from './Task.module.scss';

interface TaskProps {
  task: Api.Task;
}

let count = 0;
const Task = ({task}: TaskProps) => {
  console.log('render', count++);
  const {isModalOpen, closeModal, openModal} = useModal();
  const isDeadlineDate = !task.completedDate && task.deadlineDate;
  const isCompletedDate = task.completedDate;

  return (
    <>
      <li className={styles.item} onClick={openModal} key={task.id}>
        {isDeadlineDate && (
          <span className={styles.date}>Крайний срок: {formatDate(task.deadlineDate ?? '')}</span>
        )}
        {isCompletedDate && (
          <span className={styles.date}>
            Задача выполнена: {formatDate(task.completedDate ?? '')}
          </span>
        )}
        <h4 className={styles.title}>{task.title}</h4>
      </li>
      <ModalTask isModalOpen={isModalOpen} closeModal={closeModal} task={task} />
    </>
  );
};

export default memo(Task);
