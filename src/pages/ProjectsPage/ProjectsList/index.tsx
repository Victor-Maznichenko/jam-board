import {useUnit} from 'effector-react';
import {useEffect} from 'react';

import $projects, {getProjectsFx} from '@/store/projects';

import AddCard from '../AddCard';
import ProjectCard from '../ProjectCard';
import styles from './ProjectsList.module.scss';

const ProjectsList = () => {
  const {list: projects} = useUnit($projects);

  useEffect(() => {
    getProjectsFx();
  }, []);

  if (!projects.length) return <AddCard />;

  return (
    <div className={styles.cards}>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
      <AddCard />
    </div>
  );
};

export default ProjectsList;
