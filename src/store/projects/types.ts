import {RequestStatus} from '@/api/constants';

export interface ProjectState {
  list: Api.Project[];
  status: RequestStatus;
}

export interface UpdateProjectParams {
  projectId: string;
  body: Partial<Api.Project>;
}
