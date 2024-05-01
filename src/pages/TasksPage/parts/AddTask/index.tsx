import {useUnit} from 'effector-react';

import {PermittedUserRoles} from '@/api/constants';
import $userState from '@/store/profile';
import {useModal} from '@/utils/hooks';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

import ModalAddTask from '../ModalAddTask';
import styles from './AddTask.module.scss';

const AddTask = () => {
  const {isModalOpen, closeModal, openModal} = useModal();
  const {user} = useUnit($userState);
  if (!(user && PermittedUserRoles.includes(user.role))) return <></>;

  return (
    <>
      <Button onClick={openModal} className={styles.addTask}>
        <Icon width={20} height={20} name="plus" />
        <span className={styles.text}>Добавить задачу</span>
      </Button>
      <ModalAddTask isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default AddTask;
