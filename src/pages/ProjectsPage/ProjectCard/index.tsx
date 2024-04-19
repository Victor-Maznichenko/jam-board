import {useUnit} from 'effector-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {Project} from '@/api/types';
import {deleteProjectFx} from '@/store/projects';

import Icon from '@/components/ui/Icon';

import styles from './ProjectCard.module.scss';
import ProjectCardModal from './ProjectCardModal';

const ProjectCard = (project: Project) => {
  const {id, currentColor, title} = project;
  const deleteProject = useUnit(deleteProjectFx);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const handleDelete = () => {
    const isConfirm = confirm('Вы уверены что хотите удалить проект?');
    if (isConfirm) deleteProject(id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.tools}>
        <button className={styles.btnRemove} type="button" onClick={handleDelete}>
          <Icon width={20} height={20} name="litter" />
        </button>
        <button className={styles.btnChange} type="button" onClick={openModal}>
          <Icon width={20} height={20} name="pencil" />
        </button>
      </div>
      <Link className={styles.inner} to={`/${id}`} style={{backgroundColor: currentColor}}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <ProjectCardModal isModalOpen={isModalOpen} project={project} closeModal={closeModal} />
    </div>
  );
};

export default ProjectCard;
