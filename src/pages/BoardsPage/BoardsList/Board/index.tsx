import type {Board} from '@/api/types';

import TasksList from '../../TasksList';
import styles from './Board.module.scss';

interface BoardProps {
  board: Board;
}

const Board = ({board}: BoardProps) => {
  if (!board.tasks) return <></>;

  return (
    <div className={styles.board}>
      <h4 className={styles.title}>{board.title}</h4>
      <div className={styles.inner}>
        <TasksList tasks={board.tasks} />
      </div>
    </div>
  );
};

export default Board;
