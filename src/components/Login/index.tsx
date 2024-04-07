// import { signUpFx } from "@/store/user";
import {useUnit} from 'effector-react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {$authError, signInFx} from '@/store/user';
import {ROUTES} from '@/utils/constants';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './Login.module.scss';

const Login = ({className = ''}) => {
  const navigate = useNavigate();
  const [signInEffect, isLoading, errorMessage] = useUnit([signInFx, signInFx.pending, $authError]);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    signInEffect(values).then(() => navigate(ROUTES.DASHBOARDS));
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
