import {useContext} from 'react';

import {ThemeContext} from '@/contexts/theme';

import Icon from '../Icon';
import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = ({className = ''}) => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <button className={`${className} ${styles.switcher}`} onClick={toggleTheme} type="button">
      {theme === 'dark' ? (
        <Icon name="moon" width={30} height={30} />
      ) : (
        <Icon name="sun" width={30} height={30} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
