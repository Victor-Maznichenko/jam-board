import {useUnit} from 'effector-react';

import {PermittedUserRoles} from '@/api/constants';
import {useModal} from '@/hooks';
import $userState from '@/store/user';

import ModalAddTask from '@/components/ModalAddTask';
import Icon from '@/components/ui/Icon';

import styles from './AddTask.module.scss';

const AddTask = ({className = ''}) => {
  const {isModalOpen, openModal, closeModal} = useModal();
  const {user} = useUnit($userState);

  if (user && PermittedUserRoles.includes(user.role)) {
    return (
      <>
        <button className={`${className} ${styles.addTask}`} onClick={openModal} type="button">
          <Icon width={30} height={30} name="circle-plus" />
          Добавить задачу
        </button>
        <ModalAddTask isModalOpen={isModalOpen} closeModal={closeModal} />
      </>
    );
  }
  return <></>;
};

export default AddTask;
