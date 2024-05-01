import {RequestStatus, TaskStatus} from '@/api/constants';

export interface TasksState {
  currentProject: Api.Project;
  status: RequestStatus;
}

export interface GetBoardFxParams {
  projectID: string;
  boardID: string;
  title: string;
}

export interface FilterByUserParams {
  taskStatus: TaskStatus;
  projectID: string;
  userUID: string;
}
export interface GetProjectDoneParams {
  project: Api.Project;
  tasks: Api.Task[];
}
