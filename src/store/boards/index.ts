import {createStore, merge} from 'effector';

import {Project, RequestStatus, Task} from '@/api/types';

import {createTaskFx, getProjectFx, taskToCompleteFx, taskToProgressFx, updateProjectFx} from './actions';
import {BoardsState} from './types';

// Store
const initialState: BoardsState = {
  currentProject: null,
  status: RequestStatus.Pending,
};

export const $boardsState = createStore(initialState);

// Reducers
const reducers = {
  fail: (state: BoardsState) => ({
    ...state,
    status: RequestStatus.Fail,
  }),

  loading: (state: BoardsState) => ({
    ...state,
    status: RequestStatus.Loading,
  }),

  getProjectDone: (state: BoardsState, project: Project) => ({
    ...state,
    currentProject: project,
  }),

  createTaskDone: (state: BoardsState, task: Task) => {
    if (!state.currentProject) return state;
    const clonedState = structuredClone(state);
    clonedState.currentProject?.boards[0].tasks?.push(task);
    return clonedState;
  },

  taskToProgressDone: (state: BoardsState, task: Task) => {
    if (!state.currentProject) return state;
    const clonedState = structuredClone(state.currentProject);
    const boards = clonedState.boards;
    boards[0].tasks = clonedState.boards[0].tasks?.filter((t) => t.id !== task.id);
    clonedState.boards[1].tasks?.push(task);
    return {
      ...state,
      currentProject: clonedState,
    };
  },

  taskToCompleteDone: (state: BoardsState, task: Task) => {
    if (!state.currentProject) return state;
    const clonedState = structuredClone(state.currentProject);
    const boards = clonedState.boards;
    boards[1].tasks = clonedState.boards[1].tasks?.filter((t) => t.id !== task.id);
    clonedState.boards[2].tasks?.push(task);
    return {
      ...state,
      currentProject: clonedState,
    };
  },

  updateProjectDone: (state: BoardsState, updatedProject: Partial<Project>) => {
    if (!state.currentProject) return state;
    return {
      ...state,
      currentProject: {
        ...state.currentProject,
        ...updatedProject,
      },
    };
  },
};

// Creating combined effects
const actionsLoad = merge([getProjectFx, updateProjectFx]);
const actionsFail = merge([getProjectFx.failData, updateProjectFx.failData]);

// Binding of redusers to effects
$boardsState.on(actionsLoad, reducers.fail);
$boardsState.on(actionsFail, reducers.loading);
$boardsState.on(getProjectFx.doneData, reducers.getProjectDone);
$boardsState.on(createTaskFx.doneData, reducers.createTaskDone);
$boardsState.on(taskToProgressFx.doneData, reducers.taskToProgressDone);
$boardsState.on(taskToCompleteFx.doneData, reducers.taskToCompleteDone);
$boardsState.on(updateProjectFx.doneData, reducers.updateProjectDone);

// Exports
export default $boardsState;
export * from './actions';
export * from './types';
