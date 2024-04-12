import {useUnit} from 'effector-react';
import {useMemo} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {Link} from 'react-router-dom';

import {$user} from '@/store/user';
import {getRandomEmoji} from '@/utils/helpers';

import styles from './UserLink.module.scss';

const UserLink = () => {
  const randomEmoji = useMemo(getRandomEmoji, []);
  const user = useUnit($user);

  return (
    <Link className={styles.userLink} to="/sdfsd">
      <div className={styles.emoji}>{randomEmoji}</div>
      <span className={styles.name}>{user?.displayName ?? <Skeleton />}</span>
    </Link>
  );
};

export default UserLink;
