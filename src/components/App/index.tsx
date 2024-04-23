import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {FirebaseError} from '@/api/types';
import {getProfileFx} from '@/store/user';
import {ROUTES} from '@/utils/constants';

import AppRoutes from './AppRoutes';

const App = () => {
  const navigate = useNavigate();

  // Вход по токенам, если ошибка то на страницу логина
  useEffect(() => {
    const checkForAuth = async () => {
      try {
        await getProfileFx();
      } catch (error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.code !== 401) navigate(ROUTES.AUTH);
      }
    };

    checkForAuth();
  }, []);

  return <AppRoutes />;
};

export default App;
