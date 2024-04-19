import {createStore, merge} from 'effector';

import {Project, RequestStatus} from '@/api/types';
import {updateItemInArray} from '@/utils/helpers';

import {createProjectFx, deleteProjectFx, getProjectsFx, updateProjectFx} from './actions';
import {ProjectState} from './types';

// State
const initialState: ProjectState = {
  list: [],
  status: RequestStatus.Pending,
};

const $projectsState = createStore<ProjectState>(initialState);

// Reducers
const reducers = {
  fail: (state: ProjectState) => ({
    ...state,
    status: RequestStatus.Fail,
  }),

  loading: (state: ProjectState) => ({
    ...state,
    status: RequestStatus.Loading,
  }),

  getProjectsDone: (state: ProjectState, list: Project[]) => ({
    ...state,
    list,
    status: RequestStatus.Success,
  }),

  createProjectDone: (state: ProjectState, newProject: Project) => ({
    ...state,
    list: [...state.list, newProject],
    status: RequestStatus.Success,
  }),

  deleteProjectDone: (state: ProjectState, projectID: string) => {
    const list = state.list.filter((p) => p.id !== projectID);
    return {
      ...state,
      list,
      status: RequestStatus.Success,
    };
  },

  updateProjectDone: (state: ProjectState, newProject: Project) => ({
    ...state,
    list: updateItemInArray(newProject, state.list),
    status: RequestStatus.Success,
  }),
};

// Creating combined effects
const actionsLoad = merge([getProjectsFx, createProjectFx, createProjectFx]);
const actionsFail = merge([getProjectsFx.failData, createProjectFx.failData, createProjectFx.failData]);

// Binding of redusers to effects
$projectsState.on(actionsFail, reducers.fail);
$projectsState.on(actionsLoad, reducers.loading);
$projectsState.on(createProjectFx.doneData, reducers.createProjectDone);
$projectsState.on(getProjectsFx.doneData, reducers.getProjectsDone);
$projectsState.on(deleteProjectFx.doneData, reducers.deleteProjectDone);
$projectsState.on(updateProjectFx.doneData, reducers.updateProjectDone);

export default $projectsState;
export * from './actions';
export * from './types';
