import {ReactNode, useEffect} from 'react';

import {setBodyTheme} from '@/utils/helpers';
import useLocalStorage from '@/utils/hooks/useLocalStorage';

import {ThemeContext} from './context';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage({key: 'theme'});

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme) {
      setBodyTheme(theme);
      return;
    }

    setTheme('dark');
    setBodyTheme('dark');
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>;
};
