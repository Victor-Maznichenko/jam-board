import {createEffect} from 'effector';
import {nanoid} from 'nanoid';

import {ProjectColors} from '@/api/constants';
import {convertFromCollection} from '@/api/utils/helpers';

import {deleteEntityFx, getEntityFx, writeEntityFx} from '../firebase';

// Получить проекты
export const getProjectsFx = createEffect(async () => {
  const projectCollect = await getEntityFx({path: '/projects'});
  return convertFromCollection<Api.Project>(projectCollect);
});

// Создать проект
export const createProjectFx = createEffect(async () => {
  const id = nanoid(16);
  const newProject = {
    id,
    title: 'Название проекта',
    currentColor: ProjectColors.SKY,
  };

  await writeEntityFx({
    path: `/projects/${id}`,
    body: newProject,
  });

  return newProject as Api.Project;
});

// Удалить проект
export const deleteProjectFx = createEffect(async (id: string) => {
  await deleteEntityFx({path: `/projects/${id}`});
  return id;
});

// Изменить инфу в проекте
export const updateProjectFx = createEffect(async (newProject: Api.Project) => {
  await writeEntityFx({
    path: `/projects/${newProject.id}`,
    body: {...newProject},
  });

  return newProject as Api.Project;
});
