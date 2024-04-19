import {createContext} from 'react';

type ThemeContext = {
  theme: string | null;
  toggleTheme: () => void;
};

const initialThemeContext: ThemeContext = {
  theme: null,
  toggleTheme: () => {},
};

export const ThemeContext = createContext(initialThemeContext);
