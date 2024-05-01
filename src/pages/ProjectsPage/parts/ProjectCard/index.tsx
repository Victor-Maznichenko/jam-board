import {useState} from 'react';
import {Link} from 'react-router-dom';

import ProjectCardModal from './parts/ProjectCardModal';
import ProjectCardTools from './parts/ProjectCardTools';
import styles from './ProjectCard.module.scss';
import {ProjectCardProps} from './types';

const ProjectCard = (project: ProjectCardProps) => {
  const {id, currentColor, title} = project;
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className={styles.card}>
      <ProjectCardTools className={styles.tools} openModal={openModal} projectID={id} />
      <Link className={styles.inner} to={`/${id}`} style={{backgroundColor: currentColor}}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <ProjectCardModal isModalOpen={isModalOpen} project={project} closeModal={closeModal} />
    </div>
  );
};

export default ProjectCard;
