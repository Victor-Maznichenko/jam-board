import Board from './Board';
import styles from './BoardsList.module.scss';

interface BoardsList {
  boards: Board[];
}

const BoardsList = ({boards}: BoardsList) => (
  <div className={styles.boards}>
    {boards.map((board, index) => (
      <Board board={board} key={`board-${index}`} />
    ))}
  </div>
);

export default BoardsList;
