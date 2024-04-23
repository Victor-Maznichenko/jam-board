import {createContext} from 'react';

type ThemeContext = {
  theme: string | null;
  toggleTheme: () => void;
};

const initialContext: ThemeContext = {
  theme: null,
  toggleTheme: () => {},
};

export const ThemeContext = createContext(initialContext);
