import {useUnit} from 'effector-react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {$errorAuth, signUpFx} from '@/store/auth';
import {ROUTES} from '@/utils/constants';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './Register.module.scss';

const Register = ({className = ''}) => {
  const navigate = useNavigate();
  const [signUpEffect, isLoading, errorMessage] = useUnit([signUpFx, signUpFx.pending, $errorAuth]);
  const [values, setValues] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    signUpEffect(values).then(() => navigate(ROUTES.DASHBOARDS));
  };

  return (
    <form className={`${styles.register} ${className}`} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.displayName}
        name="displayName"
        placeholder="Псевдоним"
      />
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.email}
        type="email"
        name="email"
        placeholder="Почта"
      />
      <Input
        className={styles.input}
        onChange={handleChange}
        value={values.password}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      <Button className={styles.button} type="submit" disabled={isLoading}>
        Зарегистрироваться
      </Button>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </form>
  );
};
export default Register;
