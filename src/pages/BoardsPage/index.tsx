import {useUnit} from 'effector-react';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import $boardsState, {getProjectFx} from '@/store/boards';

import AddTask from './AddTask';
import BoardsList from './BoardsList';
import styles from './BoardsPage.module.scss';

const BoardsPage = () => {
  const {currentProject} = useUnit($boardsState);
  const {projectID} = useParams();

  useEffect(() => {
    getProjectFx(projectID ?? '');
  }, []);

  if (!currentProject) return <></>;

  return (
    <main className={styles.boards}>
      <div className="container">
        <div className={styles.top}>
          <h2 className={styles.title}>{currentProject.title}</h2>
          <AddTask />
        </div>
        <BoardsList boards={currentProject.boards} />
      </div>
    </main>
  );
};

export default BoardsPage;
