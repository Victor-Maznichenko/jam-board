import {createEffect} from 'effector';
import {nanoid} from 'nanoid';

import {TaskStatus} from '@/api/constants';
import {OperatorParam} from '@/api/requests/firebase/types';
import {convertFromDoc} from '@/api/utils/helpers';
import {getDocsQueryFx, getEntityFx, writeEntityFx} from '@/store/firebase';

import {FilterByUserParams} from './types';

// Создать задачу
export const createTaskFx = createEffect(async (task: Omit<Api.Task, 'id' | 'status'>) => {
  const id = nanoid(16);
  const newTask: Api.Task = {
    ...task,
    status: TaskStatus.Planned,
    id,
  };

  await writeEntityFx({
    path: `/tasks/${id}`,
    body: {...newTask},
  });

  return newTask;
});

// Изменить статус задачи
export const changeTaskFx = createEffect(async (task: Api.PatchedTask) => {
  await writeEntityFx({
    path: `/tasks/${task.id}`,
    body: {...task},
  });

  return task as Api.PatchedTask;
});

// Получить задачи

// 1 раз запрос, фильтровать на клиенте, тут не так!!!!
export const getTasksFx = createEffect(async (projectID: string) => {
  const tasks: Api.Task[] = [];

  const filter = {
    params: [
      {
        field: 'projectID',
        op: OperatorParam.EQUAL,
        value: projectID,
      },
    ],
  };

  const payload = await getDocsQueryFx({
    collectionId: 'tasks',
    filter,
  });

  payload.forEach((payloadElem: Api.RunQuery) => {
    if (!payloadElem.document) return;
    tasks.push(convertFromDoc(payloadElem.document));
  });

  return tasks;
});

// Получить проект
export const getProjectFx = createEffect(async (projectID: string) => {
  const projectDoc = await getEntityFx({path: `/projects/${projectID}`});
  const project = convertFromDoc<Api.Project>(projectDoc);
  const tasks = await getTasksFx(projectID);

  return {project, tasks};
});

export const filterByUserFx = createEffect(
  async ({taskStatus, projectID, userUID}: FilterByUserParams) => {
    const tasks: Record<string, Api.Task[]> = {};
    tasks[taskStatus] = [];

    const filter = {
      params: [
        {
          field: 'status',
          op: OperatorParam.EQUAL,
          value: taskStatus,
        },
        {
          field: 'projectID',
          op: OperatorParam.EQUAL,
          value: projectID,
        },
        {
          field: 'performerUID',
          op: OperatorParam.EQUAL,
          value: userUID,
        },
      ],
    };

    const payload = await getDocsQueryFx({
      collectionId: 'tasks',
      filter,
    });

    payload.forEach((payloadElem: Api.RunQuery) => {
      if (!payloadElem.document) return;
      tasks[taskStatus].push(convertFromDoc(payloadElem.document));
    });
    console.log(tasks);

    return tasks;
  },
);
