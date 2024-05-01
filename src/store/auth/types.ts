import {RequestStatus} from '@/api/constants';

export interface AuthState {
  isRedirect: boolean;
  errorMessage: string | null;
  status: RequestStatus;
}
