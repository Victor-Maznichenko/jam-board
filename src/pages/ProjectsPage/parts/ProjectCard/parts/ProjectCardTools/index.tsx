import {useUnit} from 'effector-react';

import {PermittedUserRoles} from '@/api/constants';
import $userState from '@/store/profile';
import {deleteProjectFx} from '@/store/projects';

import Icon from '@/components/ui/Icon';

import {ProjectCardToolsProps} from '../../types';
import styles from './ProjectCardTools.module.scss';

const ProjectCardTools = ({openModal, projectID, className = ''}: ProjectCardToolsProps) => {
  const {user} = useUnit($userState);
  if (!PermittedUserRoles.includes(user.role)) return <></>;

  const handleDelete = () => {
    const isConfirm = confirm('Вы уверены что хотите удалить проект?');
    if (isConfirm) deleteProjectFx(projectID);
  };

  return (
    <div className={`${styles.tools} ${className}`}>
      <button className={styles.btnRemove} type="button" onClick={handleDelete}>
        <Icon width={20} height={20} name="litter" />
      </button>
      <button className={styles.btnChange} type="button" onClick={openModal}>
        <Icon width={20} height={20} name="pencil" />
      </button>
    </div>
  );
};

export default ProjectCardTools;
