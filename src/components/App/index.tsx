import {useUnit} from 'effector-react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import useLocalStorage from '@/hooks/useLocalStorage';
import {updateCredentialsFx} from '@/store/user';
import {ROUTES} from '@/utils/constants';
import {setBodyTheme} from '@/utils/helpers';

import AppRoutes from '@/components/App/AppRoutes';

const App = () => {
  const navigate = useNavigate();
  const updateCredentials = useUnit(updateCredentialsFx);
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
    updateCredentials().catch(() => navigate(ROUTES.AUTH));
  }, []);

  return <AppRoutes />;
};

export default App;
