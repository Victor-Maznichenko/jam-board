import {useUnit} from 'effector-react';
import {useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useNavigate} from 'react-router-dom';

import {RequestStatus} from '@/api/constants';
import {changeEmailFx, signOutFx} from '@/store/auth';
import $profileState from '@/store/profile';
import {ROUTES} from '@/utils/constants';
import {useInputs} from '@/utils/hooks/useInputs';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import UserEmoji from '@/components/ui/UserEmoji';

import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const navigate = useNavigate();
  const {user, status} = useUnit($profileState);
  const isLoading = status === RequestStatus.Loading;
  const {values, handleChange, resetValues} = useInputs({email: user.email});

  const changeEmail = () => {
    if (values.email) {
      changeEmailFx(values.email);
    }
  };

  useEffect(() => {
    resetValues();
  }, [user.email]);

  const handleSignOut = () => {
    signOutFx();
    navigate(ROUTES.Auth);
  };

  return (
    <div className="container">
      <main className={styles.profile}>
        <UserEmoji className={styles.img} size={100} />
        <div className={styles.info}>
          <h2 className={styles.title}>{user.displayName ?? <Skeleton />}</h2>
          <p className={styles.role}>Тип аккаунта: {user.role ?? <Skeleton />}</p>
          <div className={styles.email}>
            <span>Ваш email:</span>
            <Input
              className={styles.emailInput}
              placeholder="Введите email"
              onChange={handleChange}
              value={values.email}
              name="email"
              type="email"
              required
            />
            <Button onClick={changeEmail} disabled={!isLoading} type="button">
              Изменить
            </Button>
          </div>
          <Button onClick={handleSignOut} type="button">
            Выйти из аккаунта
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
