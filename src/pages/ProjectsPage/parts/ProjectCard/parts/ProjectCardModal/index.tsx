import {useUnit} from 'effector-react';
import {useState} from 'react';

import {ProjectColors, RequestStatus} from '@/api/constants';
import $projectsState, {updateProjectFx} from '@/store/projects';
import {useInputs} from '@/utils/hooks/useInputs';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './ProjectCardModal.module.scss';

interface ProjectCardModalProps {
  project: Api.Project;
  isModalOpen: boolean;
  closeModal: () => void;
}

const ProjectCardModal = ({isModalOpen, closeModal, project}: ProjectCardModalProps) => {
  const {status} = useUnit($projectsState);
  const isLoading = status === RequestStatus.Loading;
  const [currentColor, setCurrentColor] = useState(project.currentColor);
  const {values, handleChange} = useInputs({title: project.title});

  const handleSubmit = async () => {
    await updateProjectFx({...project, ...values, currentColor});
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
            {Object.entries(ProjectColors).map(([key, color]) => (
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
            <Input
              className={styles.inputTitle}
              onChange={handleChange}
              value={values.title}
              name="title"
            />
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
