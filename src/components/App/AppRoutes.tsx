import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '@/utils/constants';

import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import ProjectsPage from '@/pages/ProjectsPage';
import TasksPage from '@/pages/TasksPage';

import BackgroundLayout from '@/components/layouts/BackgroundLayout';
import MainLayout from '@/components/layouts/MainLayout';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path={ROUTES.Projects} index element={<ProjectsPage />} />
      <Route path={ROUTES.Tasks} element={<TasksPage />} />
      <Route path={ROUTES.Profile} element={<ProfilePage />} />
    </Route>
    <Route element={<BackgroundLayout />}>
      <Route path={ROUTES.Auth} element={<AuthPage />} />
      <Route path={ROUTES.NotFound} element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
