import {useState} from 'react';

import {Task} from '@/api/types';
import {useModal} from '@/hooks';
import {formatDate} from '@/utils/helpers';

import ModalTask from '../ModalTask';
import styles from './TasksList.module.scss';

interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({tasks}: TasksListProps) => {
  const {isModalOpen, closeModal, openModal} = useModal();
  const [currentTask, setCurrentTask] = useState<null | Task>(null);

  const handleClick = (task: Task) => {
    setCurrentTask(task);
    openModal();
  };

  return (
    <>
      <ul className={styles.list}>
        {tasks.map((task, index) => {
          const deadlineDate = task.deadlineDate ? formatDate(task.deadlineDate) : '';
          return (
            <li className={styles.item} onClick={() => handleClick(task)} key={index}>
              <span className={styles.taskDeadline}>{deadlineDate}</span>
              <h4 className={styles.taskTitle}>{task.title}</h4>
            </li>
          );
        })}
      </ul>
      <ModalTask isModalOpen={isModalOpen} closeModal={closeModal} task={currentTask} />
    </>
  );
};

export default TasksList;

// При нажатии на ITEM будет показываться TaskPortal
