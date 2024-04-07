import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '@/utils/constants';

import AuthPage from '@/pages/AuthPage';
import BoardsPage from '@/pages/BoardsPage';
import NotFoundPage from '@/pages/NotFoundPage';

import BackgroundLayout from '@/components/layouts/BackgroundLayout';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.DASHBOARDS} index element={<BoardsPage />} />
    <Route element={<BackgroundLayout url="/images/main_background.gif" />}>
      <Route path={ROUTES.AUTH} element={<AuthPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
