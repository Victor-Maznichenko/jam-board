import {useUnit} from 'effector-react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {RequestStatus} from '@/api/types';
import $authState, {signUpFx} from '@/store/auth';
import {ROUTES} from '@/utils/constants';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './Register.module.scss';

const Register = ({className = ''}) => {
  const navigate = useNavigate();
  const {errorMessage, status} = useUnit($authState);
  const isLoading = status === RequestStatus.Loading;
  const [values, setValues] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [name]: value});
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signUpFx(values);
    navigate(ROUTES.PROJECTS);
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
