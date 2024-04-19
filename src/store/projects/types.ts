import {Project, RequestStatus} from '@/api/types';

export interface ProjectState {
  list: Project[];
  status: RequestStatus;
}

export interface UpdateProjectParams {
  projectId: string;
  body: Partial<Project>;
}
