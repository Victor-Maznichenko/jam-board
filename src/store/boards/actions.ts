import {createEffect} from 'effector';
import {nanoid} from 'nanoid';

import {Project, Task, TaskStatus} from '@/api/types';
import {createDocByIdFx, deleteEntityFx, getEntityFx, updateEntityFx} from '@/store/firebase';
import {convertFromCollection, convertFromFields} from '@/utils/helpers';

export const getProjectFx = createEffect(async (id: string) => {
  const projectDoc = await getEntityFx({path: `/projects/${id}`});
  const project = convertFromFields<Project>(projectDoc.fields);
  project.boards = [];
  for (let [board, title] of Object.entries(TaskStatus)) {
    const boardCollection = await getEntityFx({path: `/projects/${id}/${board}`});
    const newBoard = {
      id: board,
      title,
      tasks: convertFromCollection<Task>(boardCollection.documents),
    };
    project.boards.push(newBoard);
  }
  return project;
});

export const updateProjectFx = createEffect(async (id: string, newProject: Partial<Project>) => {
  await updateEntityFx({path: `/projects/${id}`, body: {...newProject}});
  return newProject;
});

interface createTaskParams {
  projectID: string;
  task: Omit<Task, 'id' | 'status'>;
}

interface taskToParams {
  projectID: string;
  task: Task;
}

export const createTaskFx = createEffect(async ({projectID, task}: createTaskParams) => {
  const id = nanoid(16);
  const newTask: Task = {
    ...task,
    id,
    status: TaskStatus.Planned,
  };
  await createDocByIdFx({
    path: `/projects/${projectID}/Planned`,
    id,
  });
  await updateEntityFx({
    path: `/projects/${projectID}/Planned/${id}`,
    body: {...newTask},
  });
  return newTask;
});

export const taskToProgressFx = createEffect(async ({projectID, task}: taskToParams) => {
  const newTask: Task = {
    ...task,
    status: TaskStatus.InProgress,
  };

  await createDocByIdFx({
    path: `/projects/${projectID}/InProgress`,
    id: task.id,
  });

  await updateEntityFx({
    path: `/projects/${projectID}/InProgress/${task.id}`,
    body: newTask,
  });

  await deleteEntityFx({
    path: `/projects/${projectID}/Planned/${task.id}`,
  });

  return newTask;
});

export const taskToCompleteFx = createEffect(async ({projectID, task}: taskToParams) => {
  const newTask: Task = {
    ...task,
    status: TaskStatus.Completed,
  };

  await createDocByIdFx({
    path: `/projects/${projectID}/Complete`,
    id: task.id,
  });

  await updateEntityFx({
    path: `/projects/${projectID}/Complete/${task.id}`,
    body: newTask,
  });

  await deleteEntityFx({
    path: `/projects/${projectID}/InProgress/${task.id}`,
  });

  return newTask;
});
