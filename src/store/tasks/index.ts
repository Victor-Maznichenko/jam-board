import {createStore, merge} from 'effector';

import {RequestStatus, TaskStatus} from '@/api/constants';

import {changeTaskFx, createTaskFx, filterByUserFx, getProjectFx} from './actions';
import {GetProjectDoneParams, TasksState} from './types';

// Store
const initialState: TasksState = {
  currentProject: {
    id: '',
    title: '',
    currentColor: '',
    tasks: {
      [TaskStatus.Planned]: [],
      [TaskStatus.Progress]: [],
      [TaskStatus.Completed]: [],
    },
  },
  status: RequestStatus.Pending,
};

export const $tasksState = createStore(initialState);

// Reducers
const reducers = {
  fail: (state: TasksState) => ({
    ...state,
    status: RequestStatus.Fail,
  }),

  loading: (state: TasksState) => ({
    ...state,
    status: RequestStatus.Loading,
  }),

  getProjectDone: (state: TasksState, {project, tasks}: GetProjectDoneParams) => {
    const clonedState = structuredClone(state);

    clonedState.currentProject = {
      ...clonedState.currentProject,
      ...project,
    };

    for (const status of Object.values(TaskStatus)) {
      clonedState.currentProject.tasks[status] = tasks.filter((t) => t.status === status);
    }

    return clonedState;
  },

  createTaskDone: (state: TasksState, task: Api.Task) => {
    const changedState = structuredClone(state);
    changedState.currentProject.tasks[TaskStatus.Planned].push(task);

    return changedState;
  },

  filterByUserDone: (state: TasksState, tasks: Record<string, Api.Task[]>) => ({
    ...state,
    currentProject: {
      ...state.currentProject,
      tasks: {
        ...state.currentProject.tasks,
        ...tasks,
      },
    },
  }),

  changeTaskDone: (state: TasksState, task: Api.PatchedTask) => {
    const clonedState = structuredClone(state);
    const tasks = clonedState.currentProject.tasks;

    // Ищу нужную задачу
    let findedTask: Api.Task | undefined;
    for (const taskStatus of Object.values(TaskStatus)) {
      if (findedTask) break;
      findedTask = tasks[taskStatus].find((t) => t.id === task.id);
    }

    // Если нашел изменяю
    if (findedTask) {
      tasks[findedTask.status] = tasks[findedTask.status].filter((t) => t.id !== task.id);
      tasks[task.status].push({...findedTask, ...task});
    }

    return clonedState;
  },
};

// Creating combined effects
const actionsLoad = merge([getProjectFx]);
const actionsFail = merge([getProjectFx.failData]);

// Binding of redusers to effects
$tasksState.on(actionsLoad, reducers.fail);
$tasksState.on(actionsFail, reducers.loading);
$tasksState.on(getProjectFx.doneData, reducers.getProjectDone);
$tasksState.on(createTaskFx.doneData, reducers.createTaskDone);
$tasksState.on(changeTaskFx.doneData, reducers.changeTaskDone);
$tasksState.on(filterByUserFx.doneData, reducers.filterByUserDone);

// Exports
export default $tasksState;
export * from './actions';
export * from './types';
