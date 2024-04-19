import {RequestStatus} from '@/api/types';

export interface AuthState {
  errorMessage: string | null;
  status: RequestStatus;
}
