import {useUnit} from 'effector-react';
import {ChangeEvent, useState} from 'react';

import {Colors} from '@/api/constants';
import {Project, RequestStatus} from '@/api/types';
import $projectsState, {updateProjectFx} from '@/store/projects';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './ProjectCardModal.module.scss';

interface ProjectCardModalProps {
  project: Project;
  isModalOpen: boolean;
  closeModal: () => void;
}

const ProjectCardModal = ({isModalOpen, closeModal, project}: ProjectCardModalProps) => {
  const {status} = useUnit($projectsState);
  const isLoading = status === RequestStatus.Loading;
  const [title, setTitle] = useState(project.title);
  const [currentColor, setCurrentColor] = useState(project.currentColor);

  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const handleSubmit = async () => {
    await updateProjectFx({...project, title, currentColor});
    closeModal();
  };

  return (
    <div
      className={`${styles.modal} ${!isModalOpen ? styles.hide : ''}`}
      style={{backgroundColor: currentColor}}
    >
      <div className={styles.inner}>
        <div className={styles.colors}>
          <h4 className={styles.title}>Выберите цвет:</h4>
          <ul className={styles.colorList}>
            {Object.entries(Colors).map(([key, color]) => (
              <li
                className={styles.color}
                style={{backgroundColor: color}}
                onClick={() => setCurrentColor(color)}
                key={key}
              />
            ))}
          </ul>
        </div>
        <div className={styles.info}>
          <div>
            <h4 className={styles.title}>Название:</h4>
            <Input className={styles.inputTitle} onChange={handleChange} value={title} />
          </div>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardModal;
