import {createEffect} from 'effector';
import {nanoid} from 'nanoid';

import {Colors} from '@/api/constants';
import {Project, TaskStatus} from '@/api/types';
import {convertFromCollection} from '@/utils/helpers';

import {createEntityFx, deleteEntityFx, getEntityFx, updateEntityFx} from '../firebase';

export const getProjectsFx = createEffect(async () => {
  const {documents} = await getEntityFx({path: '/projects'});
  return convertFromCollection<Project>(documents);
});

export const createProjectFx = createEffect(async () => {
  const id = nanoid(16);
  const newProject = {
    id,
    title: 'Название проекта',
    currentColor: Colors.SKY,
  };
  for (let board in TaskStatus) await createEntityFx({path: `/projects/${id}/${board}`});
  await updateEntityFx({path: `/projects/${id}`, body: newProject});

  return newProject as Project;
});

export const deleteProjectFx = createEffect(async (id: string) => {
  await deleteEntityFx({path: `/projects/${id}`});
  return id;
});

export const updateProjectFx = createEffect(async (newProject: Project) => {
  await updateEntityFx({
    path: `/projects/${newProject.id}`,
    body: {...newProject},
  });
  return newProject as Project;
});
