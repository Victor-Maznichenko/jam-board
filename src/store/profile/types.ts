import {RequestStatus} from '@/api/constants';

export interface ProfileState {
  user: Api.User;
  userEmoji: string;
  status: RequestStatus;
}
