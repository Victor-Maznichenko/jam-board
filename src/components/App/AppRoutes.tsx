import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '@/utils/constants';

import AuthPage from '@/pages/AuthPage';
// import BoardsPage from '@/pages/BoardsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import ProjectsPage from '@/pages/ProjectsPage';

import BackgroundLayout from '@/components/layouts/BackgroundLayout';
import MainLayout from '@/components/layouts/MainLayout';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path={ROUTES.PROJECTS} index element={<ProjectsPage />} />
      {/* <Route path={ROUTES.DASHBOARDS} element={<BoardsPage />} /> */}
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
    </Route>
    <Route element={<BackgroundLayout />}>
      <Route path={ROUTES.AUTH} element={<AuthPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
