import {RequestStatus, User} from '@/api/types';

export interface UserState {
  user: User | null;
  userEmoji: string;
  status: RequestStatus;
}
