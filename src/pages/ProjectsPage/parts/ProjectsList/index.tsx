import {useList} from 'effector-react';
import {useEffect} from 'react';

import {$projectsList, getProjectsFx} from '@/store/projects';

import AddCard from '../AddCard';
import ProjectCard from '../ProjectCard';
import styles from './ProjectsList.module.scss';

const ProjectsList = () => {
  useEffect(() => {
    getProjectsFx();
  }, []);

  return (
    <div className={styles.cards}>
      {useList($projectsList, (project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
      <AddCard />
    </div>
  );
};

export default ProjectsList;
