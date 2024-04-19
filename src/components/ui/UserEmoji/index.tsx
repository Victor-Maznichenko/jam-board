import {useUnit} from 'effector-react';

import $userState from '@/store/user';

import styles from './UserEmoji.module.scss';

const UserEmoji = ({className = '', size = 40}) => {
  const {userEmoji} = useUnit($userState);
  return (
    <div className={`${className} ${styles.emoji}`} style={{width: size, height: size, fontSize: size * 0.7}}>
      {userEmoji}
    </div>
  );
};

export default UserEmoji;
