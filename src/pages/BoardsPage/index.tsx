// import {useUnit} from 'effector-react';
// import {useEffect} from 'react';
// import {useParams} from 'react-router-dom';
// import {$project, getProjectFx} from '@/store/boards';
// import AddTask from '@/components/ui/AddTask';
// import Board from './Board';
import styles from './BoardsPage.module.scss';

const BoardsPage = () => {
  // const [getProjectEffect, project] = useUnit([getProjectFx, $project]);
  // const {projectID} = useParams();

  // useEffect(() => {
  //   if (projectID) {
  //     getProjectEffect(projectID);
  //   }
  // }, []);

  // if (!project) return <>Loading...</>;

  return (
    <main className={styles.boards}>
      <div className={styles.top}>
        <h2 className={styles.title}>ИМЯ ПРОЕКТА</h2>
        {/* <AddTask /> */}
      </div>
      {/* {Object.values(project.boards).map((board) => {
        return <Board key={board.id} board={board} />;
      })} */}
      {/* {boards.map((board) => (
          <div className="board" key={board.id}>
            <div className="board__title">{board.title}</div>
            <div className="items">
              {board.items.map((item) => (
                <div className="item" draggable key={item.id}>
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        ))} */}
    </main>
  );
};

export default BoardsPage;
