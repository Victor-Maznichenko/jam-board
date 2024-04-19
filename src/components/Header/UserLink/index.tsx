import {useUnit} from 'effector-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {Link} from 'react-router-dom';

import $userState from '@/store/user';
import {ROUTES} from '@/utils/constants';

import styles from './UserLink.module.scss';

const UserLink = () => {
  const {user, userEmoji} = useUnit($userState);

  return (
    <Link className={styles.userLink} to={ROUTES.PROFILE}>
      <div className={styles.emoji}>{userEmoji}</div>
      <span className={styles.name}>{user?.displayName ?? <Skeleton />}</span>
    </Link>
  );
};

export default UserLink;
