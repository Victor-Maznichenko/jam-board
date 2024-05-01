import {useUnit} from 'effector-react';

import {TaskStatus} from '@/api/constants';
import $tasksState from '@/store/tasks';

import ButtonFilter from '../ButtonFilter';
import Task from '../Task';
import styles from './Board.module.scss';
import useFilter from './useFilter';

interface BoardProps {
  title: string;
  status: TaskStatus;
}

const Board = ({title, status}: BoardProps) => {
  const {currentProject} = useUnit($tasksState);
  const tasksList = currentProject.tasks[status];
  const filters = useFilter({status});

  return (
    <div className={styles.board}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.inner}>
        <div className={styles.top}>
          {filters.map((filter, index) => (
            <ButtonFilter filter={filter} key={index} />
          ))}
        </div>
        <div className={styles.content}>
          {tasksList.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
