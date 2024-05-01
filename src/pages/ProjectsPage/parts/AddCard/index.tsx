import {useUnit} from 'effector-react';

import {PermittedUserRoles} from '@/api/constants';
import $userState from '@/store/profile';
import {createProjectFx} from '@/store/projects';

import Icon from '@/components/ui/Icon';

import styles from './AddCard.module.scss';

const AddCard = () => {
  const {user} = useUnit($userState);

  if (!PermittedUserRoles.includes(user.role)) return <></>;

  const handleClick = () => createProjectFx();

  return (
    <button className={styles.addCard} onClick={handleClick} type="button">
      <Icon width={24} height={24} name="plus" />
    </button>
  );
};

export default AddCard;
