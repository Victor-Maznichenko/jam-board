import {Route, Routes} from 'react-router-dom';

import AuthPage from '@/pages/AuthPage';
import BoardsPage from '@/pages/BoardsPage';
import NotFoundPage from '@/pages/NotFoundPage';

import BackgroundLayout from '@/components/layouts/BackgroundLayout';

const AppRoutes = () => (
  <Routes>
    <Route path={'/'} index element={<BoardsPage />} />
    <Route element={<BackgroundLayout url="/images/main_background.gif" />}>
      <Route path={'/auth'} element={<AuthPage />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
