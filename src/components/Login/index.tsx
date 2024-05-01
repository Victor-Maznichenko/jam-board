import {useUnit} from 'effector-react';
import {useNavigate} from 'react-router-dom';

import {RequestStatus} from '@/api/constants';
import $authState, {signInFx} from '@/store/auth';
import {ROUTES} from '@/utils/constants';
import {useInputs} from '@/utils/hooks/useInputs';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './Login.module.scss';

const Login = ({className = ''}) => {
  const navigate = useNavigate();
  const {errorMessage, status} = useUnit($authState);
  const isLoading = status === RequestStatus.Loading;
  const {values, handleChange} = useInputs<Api.LoginData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await signInFx(values);
    navigate(ROUTES.Projects);
  };

  return (
    <form className={`${styles.login} ${className}`} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.email}
        name="email"
        type="email"
        placeholder="Почта"
      />
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.password}
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <Button className={styles.button} type="submit" disabled={isLoading}>
        Ввойти
      </Button>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </form>
  );
};

export default Login;
