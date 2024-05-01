import {TaskStatus} from '@/api/constants';

export enum ROUTES {
  Tasks = '/:projectID',
  Projects = '/',
  Auth = '/auth',
  NotFound = '*',
  Profile = '/profile',
}

export const BoardTitles = {
  [TaskStatus.Planned]: '📅 Запланированно',
  [TaskStatus.Progress]: '💼 В процессе',
  [TaskStatus.Completed]: '✅ Выполнено',
};
