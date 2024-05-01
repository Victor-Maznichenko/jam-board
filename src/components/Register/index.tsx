import {useUnit} from 'effector-react';
import {useNavigate} from 'react-router-dom';

import {RequestStatus} from '@/api/constants';
import $authState, {signUpFx} from '@/store/auth';
import {ROUTES} from '@/utils/constants';
import {useInputs} from '@/utils/hooks/useInputs';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './Register.module.scss';

const Register = ({className = ''}) => {
  const navigate = useNavigate();
  const {errorMessage, status} = useUnit($authState);
  const isLoading = status === RequestStatus.Loading;
  const {values, handleChange} = useInputs<Api.RegisterData>({
    email: '',
    password: '',
    displayName: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await signUpFx(values);
    navigate(ROUTES.Projects);
  };

  return (
    <form className={`${styles.register} ${className}`} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.displayName}
        name="displayName"
        placeholder="Псевдоним"
        required
      />
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.email}
        type="email"
        name="email"
        placeholder="Почта"
        required
      />
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.password}
        type="password"
        name="password"
        placeholder="Пароль"
        required
      />
      <Button className={styles.button} type="submit" disabled={isLoading}>
        Зарегистрироваться
      </Button>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </form>
  );
};
export default Register;
