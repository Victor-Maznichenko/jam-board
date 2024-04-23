import {useUnit} from 'effector-react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';

import {Task, TaskStatus} from '@/api/types';
import {taskToCompleteFx, taskToProgressFx} from '@/store/boards';
import $userState from '@/store/user';
import {formatDate} from '@/utils/helpers';

import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

import DeadlineChoose from './DeadlineChoose';
import styles from './ModalTask.module.scss';

const portal = document.getElementById('modal');

interface ModalTaskProps {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
  isModalOpen: boolean;
  task: Task | null;
}

const ModalTask = ({isModalOpen, closeModal, task}: ModalTaskProps) => {
  const {projectID} = useParams();
  const {user} = useUnit($userState);
  const [deadlineDate, setDeadlineDate] = useState(new Date());

  if (!portal || !task || !projectID || !user) return <></>;

  switch (task.status) {
    case TaskStatus.Planned: {
      const handleClick = () => {
        const isConfirm = confirm('Ты готов взяться за задачу?');
        if (isConfirm) {
          taskToProgressFx({
            projectID,
            task: {
              ...task,
              performerName: user.displayName,
              deadlineDate: deadlineDate.toDateString(),
            },
          });
          closeModal();
        }
      };

      return ReactDOM.createPortal(
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
          <h2 className={styles.title}>{task.title}</h2>
          <p className={styles.description}>{task.description}</p>
          <p className={styles.authorName}>{task.authorName}</p>
          <DeadlineChoose taskStatus={task.status} date={deadlineDate} setDate={setDeadlineDate} />

          <Button className={styles.button} onClick={handleClick}>
            Беру в работу!
          </Button>
        </Modal>,
        portal,
      );
    }

    case TaskStatus.InProgress: {
      const handleClick = () => {
        const isConfirm = confirm('Подтвердить выполнение задачи?');
        if (isConfirm) {
          taskToCompleteFx({projectID, task});
          closeModal();
        }
      };

      return ReactDOM.createPortal(
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
          <h2 className={styles.title}>{task.title}</h2>
          <p className={styles.description}>{task.description}</p>
          <p className={styles.deadlineText}>
            <Icon width={16} height={16} name="clock" />
            <span>Крайний срок: {task.deadlineDate && formatDate(task.deadlineDate)}</span>
          </p>
          <p className={styles.authorName}>{task.authorName}</p>
          <p className={styles.performerName}>{task.performerName}</p>

          <Button className={styles.button} onClick={handleClick}>
            Я выполнил задачу!
          </Button>
        </Modal>,
        portal,
      );
    }

    case TaskStatus.Completed:
      return ReactDOM.createPortal(
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
          <h2 className={styles.title}>{task.title}</h2>
          <p className={styles.description}>{task.description}</p>
          <p className={styles.authorName}>{task.authorName}</p>
          <p className={styles.performerName}>{task.performerName}</p>
        </Modal>,
        portal,
      );
  }
};

export default ModalTask;
