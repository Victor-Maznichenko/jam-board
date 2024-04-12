import {attachLogger} from 'effector-logger';
import {useUnit} from 'effector-react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import useLocalStorage from '@/hooks/useLocalStorage';
import {updateCredentialsFx} from '@/store/auth';
import {getUserFx} from '@/store/user';
import {ROUTES} from '@/utils/constants';
import {setBodyTheme} from '@/utils/helpers';

import AppRoutes from './AppRoutes';

attachLogger();

const App = () => {
  const navigate = useNavigate();
  const getUserEffect = useUnit(getUserFx);
  const [theme, setTheme] = useLocalStorage({key: 'theme'});

  // Функция для установки темы и обновления соответствующего атрибута у body
  useEffect(() => {
    if (theme) {
      setBodyTheme(theme);
      return;
    }
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const mode = isDarkMode ? 'dark' : 'light';
    setTheme(mode);
    setBodyTheme(mode);
  }, [theme, setTheme]);

  // Вход по токенам, если ошибка то на страницу логина
  useEffect(() => {
    const checkForAuth = async () => {
      try {
        await getUserEffect();
      } catch (error) {
        navigate(ROUTES.AUTH);
      }
    };

    checkForAuth();
  }, []);

  return <AppRoutes />;
};

export default App;
