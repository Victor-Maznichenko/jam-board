import {useUnit} from 'effector-react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import $authState from '@/store/auth';
import {getProfileFx} from '@/store/profile';
import {ROUTES} from '@/utils/constants';

import AppRoutes from './AppRoutes';

const App = () => {
  const {isRedirect} = useUnit($authState);
  const navigate = useNavigate();

  // Вход по токенам, если ошибка то на страницу логина
  if (isRedirect) navigate(ROUTES.Auth);

  useEffect(() => {
    getProfileFx();
  }, []);

  return <AppRoutes />;
};

export default App;
