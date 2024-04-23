import {Project, RequestStatus} from '@/api/types';

export interface BoardsState {
  currentProject: Project | null;
  status: RequestStatus;
}
