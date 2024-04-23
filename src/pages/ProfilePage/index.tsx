import {useUnit} from 'effector-react';
import {ChangeEvent, useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';

import {signOut} from '@/api/requests/auth';
import {RequestStatus} from '@/api/types';
import {changeEmailFx} from '@/store/auth';
import $userState, {getUserFx} from '@/store/user';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import UserEmoji from '@/components/ui/UserEmoji';

import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const [{user, status}] = useUnit([$userState, getUserFx]);
  const isLoading = status === RequestStatus.Loading;
  const [value, setValue] = useState('');

  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (user) setValue(target.value);
  };

  const changeEmail = () => {
    if (value) {
      changeEmailFx(value);
    }
  };

  useEffect(() => {
    if (user) {
      setValue(user.email);
    }
  }, [user]);

  return (
    <div className="container">
      <main className={styles.profile}>
        <UserEmoji className={styles.img} size={100} />
        <div className={styles.info}>
          <h2 className={styles.title}>{user?.displayName ?? <Skeleton />}</h2>
          <p className={styles.role}>Тип аккаунта: {user?.role ?? <Skeleton />}</p>
          <div className={styles.email}>
            <span>Ваш email:</span>
            <Input
              className={styles.emailInput}
              placeholder="Введите email"
              onChange={handleChange}
              value={value}
              type="email"
              required
            />
            <Button onClick={changeEmail} disabled={!isLoading} type="button">
              Изменить
            </Button>
          </div>
          <Button onClick={signOut} type="button">
            Выйти из аккаунта
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
