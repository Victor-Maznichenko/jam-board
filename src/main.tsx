import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {ThemeProvider} from '@/contexts/theme';

import App from '@/components/App';

import '@/assets/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
