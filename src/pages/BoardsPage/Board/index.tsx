import type {Board} from '@/api/types';

import styles from './Board.module.scss';

interface BoardProps {
  board: Board;
}

const Board = ({board}: BoardProps) => {
  return <div className={styles.board}>{board.title}</div>;
};

export default Board;
