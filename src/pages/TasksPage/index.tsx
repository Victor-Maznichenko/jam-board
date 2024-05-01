import {useUnit} from 'effector-react';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {TaskStatus} from '@/api/constants';
import $tasksState, {getProjectFx} from '@/store/tasks';
import {BoardTitles} from '@/utils/constants';

import AddTask from './parts/AddTask';
import Board from './parts/Board';
import styles from './TasksPage.module.scss';

const TasksPage = () => {
  const {currentProject} = useUnit($tasksState);
  const {projectID} = useParams();
  if (!currentProject || !projectID) return <></>;

  // Внутри board делать фильтрацию можно

  useEffect(() => {
    getProjectFx(projectID);
  }, [projectID]);

  // В идеале строковых констант быть не должно
  // 📅 Запланированно и т.д. вынести в константы
  return (
    <main className={styles.boards}>
      <div className="container">
        <div className={styles.top}>
          <h2 className={styles.title}>{currentProject.title}</h2>
          <AddTask />
        </div>

        <div className={styles.list}>
          {Object.values(TaskStatus).map((status) => (
            <Board title={BoardTitles[status]} key={status} status={status} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TasksPage;
